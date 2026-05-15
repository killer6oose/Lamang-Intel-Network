'use strict';

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const path = require('path');
const fs = require('fs');
const { buildVultureEmbed } = require('../utils/embeds');
const { getSetting, setSetting } = require('../db/index');

// Load vulture data at startup
const VULTURE_PATH = path.join(__dirname, '../../../data/vulture.json');
let vultureData = { possibleLocations: [] };
try {
  vultureData = JSON.parse(fs.readFileSync(VULTURE_PATH, 'utf8'));
} catch (err) {
  console.warn('[vulture] Could not load vulture.json:', err.message);
}

function getLocationChoices() {
  return (vultureData.possibleLocations || []).map((loc) => ({
    name: loc.name,
    value: loc.name,
  }));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vulture')
    .setDescription('Show or update the current Vulture vendor locations')
    .addStringOption((opt) =>
      opt
        .setName('location1')
        .setDescription('First Vulture location this week')
        .setRequired(false)
        .setAutocomplete(true)
    )
    .addStringOption((opt) =>
      opt
        .setName('location2')
        .setDescription('Second Vulture location this week')
        .setRequired(false)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    const focused = interaction.options.getFocused(true);
    const query = focused.value.toLowerCase();
    const choices = getLocationChoices().filter((c) =>
      c.name.toLowerCase().includes(query)
    );
    await interaction.respond(choices.slice(0, 25));
  },

  async execute(interaction) {
    const member = interaction.member;
    const loc1 = interaction.options.getString('location1');
    const loc2 = interaction.options.getString('location2');

    // No locations provided - show current stored location (anyone can check)
    if (!loc1 && !loc2) {
      const currentLoc1 = getSetting('vulture_location1');
      const currentLoc2 = getSetting('vulture_location2');

      if (!currentLoc1 && !currentLoc2) {
        return interaction.reply({
          content: 'No Vulture locations have been set yet. Use `/vulture [location1] [location2]` to set them.',
          ephemeral: true,
        });
      }

      const locData1 = currentLoc1 && vultureData.possibleLocations.find(
        (l) => l.name.toLowerCase() === currentLoc1.toLowerCase()
      );
      const locData2 = currentLoc2 && vultureData.possibleLocations.find(
        (l) => l.name.toLowerCase() === currentLoc2.toLowerCase()
      );

      const image1 = locData1?.imageUrl || null;
      const image2 = locData2?.imageUrl || null;

      const embed = buildVultureEmbed(
        currentLoc1 || 'Unknown',
        currentLoc2 || 'Unknown',
        image1,
        image2
      );

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    // Locations provided - permission check required to update
    const hasManage = member.permissions.has(PermissionFlagsBits.ManageGuild);
    const reporterRoleId = getSetting('reporter_role_id');
    const hasReporterRole = reporterRoleId && member.roles.cache.has(reporterRoleId);

    if (!hasManage && !hasReporterRole) {
      return interaction.reply({
        content: 'You need the **Manage Server** permission or the designated reporter role to update Vulture locations.',
        ephemeral: true,
      });
    }

    // Find image URLs from data if available
    const locData1 = vultureData.possibleLocations.find(
      (l) => l.name.toLowerCase() === loc1.toLowerCase()
    );
    const locData2 = vultureData.possibleLocations.find(
      (l) => l.name.toLowerCase() === loc2.toLowerCase()
    );

    const image1 = locData1?.imageUrl || null;
    const image2 = locData2?.imageUrl || null;

    const embed = buildVultureEmbed(loc1, loc2, image1, image2);

    // Save current locations to settings
    setSetting('vulture_location1', loc1);
    setSetting('vulture_location2', loc2);

    // Determine target channel
    const vultureChannelId = getSetting('vulture_channel_id');
    let targetChannel = null;

    if (vultureChannelId) {
      targetChannel = interaction.guild.channels.cache.get(vultureChannelId);
    }

    if (!targetChannel) {
      return interaction.reply({
        content: 'No Vulture update channel configured. Please set one in the web dashboard under Settings.',
        ephemeral: true,
      });
    }

    await targetChannel.send({ embeds: [embed] });

    await interaction.reply({
      content: `Vulture location update posted to <#${targetChannel.id}>: **${loc1}** and **${loc2}**`,
      ephemeral: true,
    });
  },
};
