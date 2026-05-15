'use strict';

const { EmbedBuilder } = require('discord.js');

const FOOTER_TEXT = 'Lamang Intelligence Network • lamangintel.net';
const FOOTER_ICON = 'https://lamangintel.net/assets/favicon.ico';
const SITE_URL    = 'https://lamangintel.net';

/**
 * Build a base embed with the standard LIN footer.
 * @param {object} options
 * @param {string} [options.title]
 * @param {string} [options.description]
 * @param {number|string} [options.color] - hex string like '#4a6741' or integer
 * @param {string} [options.url]
 * @param {string} [options.thumbnail]
 * @param {string} [options.image]
 * @param {Array<{name:string,value:string,inline?:boolean}>} [options.fields]
 * @param {string} [options.authorName]
 * @param {string} [options.authorIcon]
 * @returns {EmbedBuilder}
 */
function buildEmbed(options = {}) {
  const embed = new EmbedBuilder();

  if (options.title) embed.setTitle(options.title);
  if (options.description) embed.setDescription(options.description);
  if (options.url) embed.setURL(options.url);
  if (options.thumbnail) embed.setThumbnail(options.thumbnail);
  if (options.image) embed.setImage(options.image);

  if (options.color !== undefined) {
    const color =
      typeof options.color === 'string'
        ? parseInt(options.color.replace('#', ''), 16)
        : options.color;
    embed.setColor(color);
  } else {
    embed.setColor(0x4a6741);
  }

  if (options.fields && options.fields.length > 0) {
    embed.addFields(options.fields);
  }

  if (options.authorName) {
    embed.setAuthor({ name: options.authorName, iconURL: options.authorIcon || null });
  }

  embed.setFooter({ text: FOOTER_TEXT, iconURL: FOOTER_ICON });
  if (!options.url) embed.setURL(SITE_URL);
  embed.setTimestamp();

  return embed;
}

/**
 * Build a Vulture location update embed.
 * @param {string} loc1
 * @param {string} loc2
 * @param {string|null} image1
 * @param {string|null} image2
 * @returns {EmbedBuilder}
 */
function buildVultureEmbed(loc1, loc2, image1 = null, image2 = null) {
  const fields = [
    { name: 'Location 1', value: loc1 || 'Unknown', inline: true },
    { name: 'Location 2', value: loc2 || 'Unknown', inline: true },
  ];

  const embed = buildEmbed({
    title: 'Vulture Location Update',
    description: 'The black-market vendor **Vulture** has been spotted at new locations. Rotates each Monday.',
    color: '#4a6741',
    fields,
    url: 'https://lamangintel.net',
  });

  if (image1) embed.setImage(image1);

  return embed;
}

/**
 * Build a boss info embed.
 * @param {object} boss - boss data object from bosses.json
 * @returns {EmbedBuilder}
 */
function buildBossEmbed(boss) {
  const fields = [
    { name: 'Faction', value: boss.faction || 'Unknown', inline: true },
    { name: 'Type', value: boss.type || 'Unknown', inline: true },
    { name: 'Difficulty', value: boss.difficulty || 'Unknown', inline: true },
    { name: 'Known Locations', value: (boss.locations || []).join('\n') || 'Unknown', inline: false },
  ];

  if (boss.notableLoot) {
    fields.push({ name: 'Notable Loot', value: boss.notableLoot, inline: false });
  }

  if (boss.intel) {
    fields.push({ name: 'Intel', value: boss.intel, inline: false });
  }

  return buildEmbed({
    title: `${boss.callsign ? `[${boss.callsign}] ` : ''}${boss.name}`,
    color: '#6b9c5e',
    fields,
    url: `https://lamangintel.net/bosses.html#${boss.id}`,
  });
}

/**
 * Build an embed listing bosses at a given location.
 * @param {string} location
 * @param {Array<object>} bosses
 * @returns {EmbedBuilder}
 */
function buildLocationBossEmbed(location, bosses) {
  const lines = bosses.map((b) => {
    const callsign = b.callsign ? ` (${b.callsign})` : '';
    return `**${b.name}${callsign}** — ${b.faction} | ${b.difficulty}`;
  });

  return buildEmbed({
    title: `Bosses at ${location}`,
    description: lines.join('\n') || 'No bosses found at this location.',
    color: '#6b9c5e',
    url: 'https://lamangintel.net/bosses.html',
  });
}

module.exports = { buildEmbed, buildVultureEmbed, buildBossEmbed, buildLocationBossEmbed };
