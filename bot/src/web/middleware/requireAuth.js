'use strict';

const { PermissionFlagsBits } = require('discord.js');

/**
 * Middleware that requires:
 * 1. An active Discord OAuth session
 * 2. The user has Manage Server permission in the configured guild
 */
async function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    req.session.returnTo = req.originalUrl;
    return res.redirect('/auth/login');
  }

  // Verify the user still has Manage Server in the guild
  const client = req.discordClient;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!guildId) {
    console.warn('[requireAuth] DISCORD_GUILD_ID not set');
    return next();
  }

  try {
    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
      console.warn('[requireAuth] Guild not in cache, skipping perm check');
      return next();
    }

    const member = await guild.members.fetch(req.session.user.id).catch(() => null);
    if (!member) {
      req.session.destroy(() => {});
      return res.redirect('/auth/login?error=not_member');
    }

    if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      return res.status(403).render('login', {
        error: 'You must have the Manage Server permission to access this dashboard.',
        title: 'Access Denied - Lamang Intelligence Network',
      });
    }

    // Refresh user info in session
    res.locals.user = req.session.user;
    next();
  } catch (err) {
    console.error('[requireAuth] Error during auth check:', err);
    next(err);
  }
}

module.exports = { requireAuth };
