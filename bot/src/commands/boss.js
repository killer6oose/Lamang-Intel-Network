'use strict';

const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');
const { buildBossEmbed, buildLocationBossEmbed } = require('../utils/embeds');

// Load boss data at startup
const BOSSES_PATH = path.join(__dirname, '../../../data/bosses.json');
let bossesData = [];
try {
  bossesData = JSON.parse(fs.readFileSync(BOSSES_PATH, 'utf8'));
} catch (err) {
  console.warn('[boss] Could not load bosses.json:', err.message);
}

// Build autocomplete choices: boss names + unique locations
function getAutocompleteChoices() {
  const choices = [];

  // Boss names
  for (const boss of bossesData) {
    choices.push({ name: `Boss: ${boss.name} (${boss.callsign || boss.id})`, value: boss.id });
  }

  // Unique locations
  const locations = new Set();
  for (const boss of bossesData) {
    for (const loc of boss.locations || []) {
      if (!locations.has(loc) && loc !== 'Being mapped') {
        locations.add(loc);
        choices.push({ name: `Location: ${loc}`, value: `loc:${loc}` });
      }
    }
  }

  return choices;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('boss')
    .setDescription('Look up a boss or list bosses at a location')
    .addStringOption((opt) =>
      opt
        .setName('query')
        .setDescription('Boss name or location name')
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    const focused = interaction.options.getFocused().toLowerCase();
    const choices = getAutocompleteChoices().filter((c) =>
      c.name.toLowerCase().includes(focused)
    );
    await interaction.respond(choices.slice(0, 25));
  },

  async execute(interaction) {
    const query = interaction.options.getString('query');

    // Check if it's a location query
    if (query.startsWith('loc:')) {
      const location = query.slice(4);
      const bosses = bossesData.filter((b) =>
        (b.locations || []).some((l) => l.toLowerCase() === location.toLowerCase())
      );

      const embed = buildLocationBossEmbed(location, bosses);
      return interaction.reply({ embeds: [embed] });
    }

    // Try to match by boss id, callsign, or name
    const boss =
      bossesData.find((b) => b.id === query) ||
      bossesData.find((b) => b.callsign?.toLowerCase() === query.toLowerCase()) ||
      bossesData.find((b) => b.name.toLowerCase() === query.toLowerCase());

    if (boss) {
      const embed = buildBossEmbed(boss);
      return interaction.reply({ embeds: [embed] });
    }

    // Fallback: try location match by string
    const location = query;
    const bosses = bossesData.filter((b) =>
      (b.locations || []).some((l) => l.toLowerCase() === location.toLowerCase())
    );

    if (bosses.length > 0) {
      const embed = buildLocationBossEmbed(location, bosses);
      return interaction.reply({ embeds: [embed] });
    }

    return interaction.reply({
      content: `No boss or location found matching **${query}**.`,
      ephemeral: true,
    });
  },
};
