'use strict';

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('post')
    .setDescription('Post a message to a specified channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addChannelOption((opt) =>
      opt
        .setName('channel')
        .setDescription('Target channel to post in')
        .setRequired(true)
    )
    .addStringOption((opt) =>
      opt
        .setName('message')
        .setDescription('The message to post (up to 2000 characters)')
        .setRequired(true)
        .setMaxLength(2000)
    ),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      return interaction.reply({
        content: 'You need the **Manage Server** permission to use this command.',
        ephemeral: true,
      });
    }

    const channel = interaction.options.getChannel('channel');
    const message = interaction.options.getString('message');

    if (!channel.isTextBased()) {
      return interaction.reply({
        content: 'Please select a text channel.',
        ephemeral: true,
      });
    }

    try {
      await channel.send({ content: message });
      await interaction.reply({
        content: `Message posted to <#${channel.id}> successfully.`,
        ephemeral: true,
      });
    } catch (err) {
      console.error('[post] Failed to send message:', err);
      await interaction.reply({
        content: `Failed to post message: ${err.message}`,
        ephemeral: true,
      });
    }
  },
};
