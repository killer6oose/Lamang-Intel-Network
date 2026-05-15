'use strict';

const express = require('express');
const session = require('express-session');
const path = require('path');

const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const scheduleRouter = require('./routes/schedule');
const settingsRouter = require('./routes/settings');
const apiRouter = require('./routes/api');

function createServer(discordClient) {
  const app = express();

  // Trust Cloudflare / reverse proxy (needed for secure cookies over HTTPS)
  app.set('trust proxy', 1);

  // Template engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  // Static files
  app.use(express.static(path.join(__dirname, '../../public')));

  // Body parsing
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Session
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'changeme',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      },
    })
  );

  // Make discord client available to routes
  app.use((req, res, next) => {
    req.discordClient = discordClient;
    next();
  });

  // Local template variables
  app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.baseUrl = process.env.BASE_URL || 'http://localhost:3001';
    next();
  });

  // Routes
  app.use('/auth', authRouter);
  app.use('/api', apiRouter);
  app.use('/', dashboardRouter);
  app.use('/schedule', scheduleRouter);
  app.use('/settings', settingsRouter);

  // 404 handler
  app.use((req, res) => {
    res.status(404).render('login', {
      error: 'Page not found.',
      title: '404 - Lamang Intelligence Network',
    });
  });

  // Error handler
  app.use((err, req, res, next) => {
    console.error('[Web] Unhandled error:', err);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  });

  return app;
}

module.exports = { createServer };
