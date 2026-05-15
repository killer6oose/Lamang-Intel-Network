'use strict';

const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/requireAuth');
const {
  getScheduledPosts,
  getScheduledPost,
  createScheduledPost,
  updateScheduledPost,
  deleteScheduledPost,
} = require('../../db/index');
const { reloadPost, unschedulePost } = require('../../utils/scheduler');
const cron = require('node-cron');

// GET /schedule
router.get('/', requireAuth, async (req, res) => {
  const client = req.discordClient;
  const posts = getScheduledPosts();

  // Fetch guild text channels for dropdown
  let channels = [];
  try {
    const guildId = process.env.DISCORD_GUILD_ID;
    const guild = client.guilds.cache.get(guildId);
    if (guild) {
      await guild.channels.fetch();
      channels = guild.channels.cache
        .filter((c) => c.isTextBased() && !c.isThread())
        .map((c) => ({ id: c.id, name: c.name, parentName: c.parent?.name || '' }))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  } catch (err) {
    console.error('[schedule] Failed to fetch channels:', err);
  }

  res.render('schedule', {
    title: 'Scheduled Posts - Lamang Intelligence Network',
    posts,
    channels,
    error: req.query.error || null,
    success: req.query.success || null,
  });
});

// POST /schedule/create
router.post('/create', requireAuth, (req, res) => {
  const { channel_id, content_type, content_text, content_embed, schedule, is_recurring } = req.body;

  if (!channel_id || !schedule) {
    return res.redirect('/schedule?error=missing_fields');
  }

  let content;
  if (content_type === 'embed') {
    let embedData;
    try {
      embedData = JSON.parse(content_embed);
    } catch {
      return res.redirect('/schedule?error=invalid_embed_json');
    }
    content = JSON.stringify({ type: 'embed', data: embedData });
  } else {
    if (!content_text || content_text.trim() === '') {
      return res.redirect('/schedule?error=missing_content');
    }
    content = JSON.stringify({ type: 'text', data: content_text.trim() });
  }

  const recurring = is_recurring === 'on' || is_recurring === '1' ? 1 : 0;

  // Validate schedule
  if (recurring && !cron.validate(schedule)) {
    return res.redirect('/schedule?error=invalid_cron');
  }
  if (!recurring && isNaN(new Date(schedule).getTime())) {
    return res.redirect('/schedule?error=invalid_datetime');
  }

  try {
    const id = createScheduledPost({ channel_id, content, schedule, is_recurring: recurring, enabled: 1 });
    const post = getScheduledPost(id);
    const client = req.discordClient;
    reloadPost(client, post);
    res.redirect('/schedule?success=created');
  } catch (err) {
    console.error('[schedule] Create error:', err);
    res.redirect('/schedule?error=db_error');
  }
});

// POST /schedule/:id/toggle
router.post('/:id/toggle', requireAuth, (req, res) => {
  const post = getScheduledPost(req.params.id);
  if (!post) return res.redirect('/schedule?error=not_found');

  const newEnabled = post.enabled ? 0 : 1;
  updateScheduledPost(post.id, { enabled: newEnabled });

  if (newEnabled) {
    const updatedPost = getScheduledPost(post.id);
    reloadPost(req.discordClient, updatedPost);
  } else {
    unschedulePost(post.id);
  }

  res.redirect('/schedule?success=updated');
});

// POST /schedule/:id/delete
router.post('/:id/delete', requireAuth, (req, res) => {
  const post = getScheduledPost(req.params.id);
  if (!post) return res.redirect('/schedule?error=not_found');

  unschedulePost(post.id);
  deleteScheduledPost(post.id);
  res.redirect('/schedule?success=deleted');
});

module.exports = router;
