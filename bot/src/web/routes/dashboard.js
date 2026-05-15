'use strict';

const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/requireAuth');
const { getScheduledPosts, getSetting } = require('../../db/index');
const { buildVultureEmbed } = require('../../utils/embeds');
const path = require('path');
const fs = require('fs');

// Load vulture data for the quick action
const VULTURE_PATH = path.join(__dirname, '../../../../data/vulture.json');
let vultureData = { currentLocations: [], possibleLocations: [] };
try {
  vultureData = JSON.parse(fs.readFileSync(VULTURE_PATH, 'utf8'));
} catch {
  // data file may not exist yet
}

// GET / - dashboard
router.get('/', requireAuth, (req, res) => {
  const client = req.discordClient;
  const recentPosts = getScheduledPosts().slice(0, 10);
  const botOnline = client && client.isReady();

  res.render('dashboard', {
    title: 'Dashboard - Lamang Intelligence Network',
    botOnline,
    recentPosts,
    vultureLocations: vultureData.currentLocations || [],
    possibleLocations: vultureData.possibleLocations || [],
    success: req.query.success || null,
    error: req.query.error || null,
  });
});

// POST /vulture-quick - trigger Vulture embed from dashboard
router.post('/vulture-quick', requireAuth, async (req, res) => {
  const { location1, location2 } = req.body;

  if (!location1 || !location2) {
    return res.redirect('/?error=missing_locations');
  }

  const client = req.discordClient;
  const vultureChannelId = getSetting('vulture_channel_id');

  if (!vultureChannelId) {
    return res.redirect('/?error=no_channel');
  }

  try {
    const channel = await client.channels.fetch(vultureChannelId);
    if (!channel) {
      return res.redirect('/?error=channel_not_found');
    }

    const locData1 = vultureData.possibleLocations.find(
      (l) => l.name === location1
    );
    const locData2 = vultureData.possibleLocations.find(
      (l) => l.name === location2
    );

    const embed = buildVultureEmbed(
      location1,
      location2,
      locData1?.imageUrl || null,
      locData2?.imageUrl || null
    );

    await channel.send({ embeds: [embed] });
    res.redirect('/?success=vulture_posted');
  } catch (err) {
    console.error('[dashboard] Vulture quick action error:', err);
    res.redirect('/?error=post_failed');
  }
});

module.exports = router;
