'use strict';

const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/requireAuth');
const { getAllSettings, setSetting } = require('../../db/index');

// GET /settings
router.get('/', requireAuth, async (req, res) => {
  const client = req.discordClient;
  const settings = getAllSettings();

  // Fetch guild roles for reporter role dropdown
  let roles = [];
  try {
    const guildId = process.env.DISCORD_GUILD_ID;
    const guild = client.guilds.cache.get(guildId);
    if (guild) {
      await guild.roles.fetch();
      roles = guild.roles.cache
        .filter((r) => !r.managed && r.name !== '@everyone')
        .map((r) => ({ id: r.id, name: r.name, color: r.hexColor }))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  } catch (err) {
    console.error('[settings] Failed to fetch roles:', err);
  }

  // Fetch text channels for channel dropdowns
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
    console.error('[settings] Failed to fetch channels:', err);
  }

  res.render('settings', {
    title: 'Settings - Lamang Intelligence Network',
    settings,
    roles,
    channels,
    success: req.query.success || null,
    error: req.query.error || null,
  });
});

// POST /settings
router.post('/', requireAuth, (req, res) => {
  const { vulture_channel_id, announcement_channel_id, reporter_role_id } = req.body;

  try {
    if (vulture_channel_id !== undefined) setSetting('vulture_channel_id', vulture_channel_id.trim());
    if (announcement_channel_id !== undefined) setSetting('announcement_channel_id', announcement_channel_id.trim());
    if (reporter_role_id !== undefined) setSetting('reporter_role_id', reporter_role_id.trim());

    res.redirect('/settings?success=saved');
  } catch (err) {
    console.error('[settings] Save error:', err);
    res.redirect('/settings?error=db_error');
  }
});

module.exports = router;
