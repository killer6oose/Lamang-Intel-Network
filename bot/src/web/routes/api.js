'use strict';

const express = require('express');
const router = express.Router();
const { getSetting } = require('../../db/index');
const { buildVultureEmbed } = require('../../utils/embeds');

/**
 * Bearer token auth middleware for API routes.
 */
function requireApiToken(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const expected = process.env.BOT_API_SECRET;

  if (!expected || token !== expected) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
  next();
}

/**
 * POST /api/vulture-update
 * Called by the main website admin page to post a Vulture embed.
 * Body: { location1, location2, image1?, image2?, link1?, link2? }
 */
router.post('/vulture-update', requireApiToken, async (req, res) => {
  const { location1, location2, image1, image2 } = req.body;

  if (!location1 || !location2) {
    return res.status(400).json({ ok: false, error: 'location1 and location2 are required' });
  }

  const client = req.discordClient;
  const vultureChannelId = getSetting('vulture_channel_id');

  if (!vultureChannelId) {
    return res.status(503).json({ ok: false, error: 'Vulture channel not configured' });
  }

  try {
    const channel = await client.channels.fetch(vultureChannelId);
    if (!channel) {
      return res.status(404).json({ ok: false, error: 'Configured Vulture channel not found' });
    }

    const embed = buildVultureEmbed(
      location1,
      location2,
      image1 || null,
      image2 || null
    );

    await channel.send({ embeds: [embed] });

    res.json({ ok: true, message: `Vulture update posted: ${location1} / ${location2}` });
  } catch (err) {
    console.error('[api/vulture-update] Error:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * GET /api/status
 * Returns bot online status. Used by the dashboard.
 */
router.get('/status', requireApiToken, (req, res) => {
  const client = req.discordClient;
  res.json({
    ok: true,
    online: client && client.isReady(),
    tag: client?.user?.tag || null,
    guildCount: client?.guilds?.cache?.size || 0,
  });
});

module.exports = router;
