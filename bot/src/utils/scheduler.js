'use strict';

const cron = require('node-cron');
const { getScheduledPosts, markPostRan, deleteScheduledPost } = require('../db/index');

// Map of post id -> cron task
const activeTasks = new Map();

/**
 * Parse post content (stored as JSON string or plain string).
 */
function parseContent(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return { type: 'text', data: raw };
  }
}

/**
 * Execute a scheduled post.
 * @param {object} client - Discord.js Client
 * @param {object} post - scheduled_post row
 */
async function executePost(client, post) {
  try {
    const channel = await client.channels.fetch(post.channel_id).catch(() => null);
    if (!channel) {
      console.warn(`[Scheduler] Channel ${post.channel_id} not found for post ${post.id}`);
      return;
    }

    const content = parseContent(post.content);

    if (content.type === 'embed') {
      const { EmbedBuilder } = require('discord.js');
      const { buildEmbed } = require('./embeds');
      const embedData = content.data;

      const embed = buildEmbed({
        title: embedData.title,
        description: embedData.description,
        color: embedData.color,
        fields: embedData.fields,
        url: embedData.url,
        image: embedData.image,
        thumbnail: embedData.thumbnail,
      });

      await channel.send({ embeds: [embed] });
    } else {
      await channel.send({ content: content.data || String(content) });
    }

    markPostRan(post.id);
    console.log(`[Scheduler] Executed post ${post.id} in channel ${post.channel_id}`);
  } catch (err) {
    console.error(`[Scheduler] Error executing post ${post.id}:`, err);
  }
}

/**
 * Schedule a single post.
 */
function schedulePost(client, post) {
  if (activeTasks.has(post.id)) {
    activeTasks.get(post.id).destroy();
    activeTasks.delete(post.id);
  }

  if (!post.enabled) return;

  if (post.is_recurring) {
    // Validate cron expression
    if (!cron.validate(post.schedule)) {
      console.warn(`[Scheduler] Invalid cron expression for post ${post.id}: "${post.schedule}"`);
      return;
    }

    const task = cron.schedule(post.schedule, () => executePost(client, post), {
      timezone: 'UTC',
    });

    activeTasks.set(post.id, task);
    console.log(`[Scheduler] Scheduled recurring post ${post.id} with cron "${post.schedule}"`);
  } else {
    // One-time post: check if ISO datetime is in the future
    const runAt = new Date(post.schedule);
    if (isNaN(runAt.getTime())) {
      console.warn(`[Scheduler] Invalid datetime for post ${post.id}: "${post.schedule}"`);
      return;
    }

    const now = new Date();
    const delay = runAt.getTime() - now.getTime();

    if (delay <= 0) {
      console.warn(`[Scheduler] One-time post ${post.id} is in the past, skipping`);
      return;
    }

    const timer = setTimeout(async () => {
      await executePost(client, post);
      // Remove from DB after one-time execution
      deleteScheduledPost(post.id);
      activeTasks.delete(post.id);
    }, delay);

    // Store as object with destroy method for consistency
    activeTasks.set(post.id, { destroy: () => clearTimeout(timer) });
    console.log(`[Scheduler] Scheduled one-time post ${post.id} for ${runAt.toISOString()}`);
  }
}

/**
 * Initialize scheduler - loads all enabled posts from DB and schedules them.
 */
function initScheduler(client) {
  const posts = getScheduledPosts(true);
  for (const post of posts) {
    schedulePost(client, post);
  }
  console.log(`[Scheduler] Loaded ${posts.length} scheduled post(s)`);
}

/**
 * Reload a single post (call after create/update/delete from web UI).
 */
function reloadPost(client, post) {
  schedulePost(client, post);
}

/**
 * Remove a post from the scheduler.
 */
function unschedulePost(id) {
  if (activeTasks.has(id)) {
    activeTasks.get(id).destroy();
    activeTasks.delete(id);
  }
}

module.exports = { initScheduler, schedulePost, reloadPost, unschedulePost, executePost };
