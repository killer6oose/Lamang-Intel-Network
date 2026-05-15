'use strict';

require('dotenv').config();

const { startBot } = require('./src/bot');
const { createServer } = require('./src/web/server');
const { initDb } = require('./src/db/index');
const { initScheduler } = require('./src/utils/scheduler');

async function main() {
  // Initialize database
  initDb();
  console.log('[LIN] Database initialized');

  // Start Discord bot
  const client = await startBot();
  console.log('[LIN] Discord bot starting...');

  // Start web server
  const port = process.env.PORT || 3001;
  const app = createServer(client);
  app.listen(port, () => {
    console.log(`[LIN] Web UI listening on port ${port}`);
  });

  // Initialize scheduler (after bot client is ready)
  client.once('ready', () => {
    initScheduler(client);
    console.log('[LIN] Scheduler initialized');
  });
}

main().catch((err) => {
  console.error('[LIN] Fatal error during startup:', err);
  process.exit(1);
});
