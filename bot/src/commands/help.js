'use strict';

const { SlashCommandBuilder } = require('discord.js');
const { buildEmbed } = require('../utils/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show available Lamang Intelligence Network bot commands'),

  async execute(interaction) {
    const embed = buildEmbed({
      title: 'Lamang Intelligence Network - Commands',
      description: 'Community intel bot for Gray Zone Warfare. Use the commands below to pull up live intel.',
      color: '#4a6741',
      fields: [
        {
          name: '/boss [query]',
          value: 'Look up a boss by name or find all bosses at a location. Supports autocomplete - start typing a boss name or location and select from the list.',
          inline: false,
        },
        {
          name: '/vulture [location1] [location2]',
          value: 'Post the current Vulture vendor locations to the configured channel. Vulture rotates each Monday.',
          inline: false,
        },
        {
          name: '/post [channel] [message]',
          value: 'Post a plain text message to any channel the bot has access to.',
          inline: false,
        },
        {
          name: '/help',
          value: 'Shows this message.',
          inline: false,
        },
      ],
    });

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
