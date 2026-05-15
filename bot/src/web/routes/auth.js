'use strict';

const express = require('express');
const router = express.Router();

const DISCORD_API = 'https://discord.com/api/v10';
const SCOPES = 'identify guilds';

function getRedirectUri() {
  const base = process.env.BASE_URL || 'http://localhost:3001';
  return `${base}/auth/discord/callback`;
}

// GET /auth/login - redirect to Discord OAuth2
router.get('/login', (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: getRedirectUri(),
    response_type: 'code',
    scope: SCOPES,
  });
  res.redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`);
});

// GET /auth/discord/callback
router.get('/discord/callback', async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    return res.render('login', {
      error: `Discord OAuth error: ${error}`,
      title: 'Login - Lamang Intelligence Network',
    });
  }

  if (!code) {
    return res.render('login', {
      error: 'No authorization code received.',
      title: 'Login - Lamang Intelligence Network',
    });
  }

  try {
    // Exchange code for token
    const tokenRes = await fetch(`${DISCORD_API}/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: getRedirectUri(),
      }).toString(),
    });

    if (!tokenRes.ok) {
      const body = await tokenRes.text();
      console.error('[auth] Token exchange failed:', body);
      return res.render('login', {
        error: 'Failed to exchange authorization code.',
        title: 'Login - Lamang Intelligence Network',
      });
    }

    const tokenData = await tokenRes.json();

    // Fetch user info
    const userRes = await fetch(`${DISCORD_API}/users/@me`, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userRes.ok) {
      return res.render('login', {
        error: 'Failed to fetch Discord user info.',
        title: 'Login - Lamang Intelligence Network',
      });
    }

    const userData = await userRes.json();

    req.session.user = {
      id: userData.id,
      username: userData.username,
      discriminator: userData.discriminator,
      avatar: userData.avatar,
      accessToken: tokenData.access_token,
    };

    const returnTo = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(returnTo);
  } catch (err) {
    console.error('[auth] OAuth callback error:', err);
    res.render('login', {
      error: 'An unexpected error occurred during login.',
      title: 'Login - Lamang Intelligence Network',
    });
  }
});

// GET /auth/logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
