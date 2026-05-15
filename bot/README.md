# Lamang Intelligence Network - Discord Bot

Discord bot and web control panel for the [Lamang Intelligence Network](https://lamangeintel.net) community.

## Features

- `/vulture` — Post current Vulture vendor locations to a configured channel
- `/boss` — Look up boss intel or list bosses at a location
- `/post` — Post a message to any channel (requires Manage Server)
- Web dashboard at `bot.lamangintel.net` with Discord OAuth2 login
- Scheduled posts (recurring cron or one-time) managed via the web UI
- API endpoint for the main site to push Vulture updates

## Requirements

- Node.js 18+
- A Discord application with a bot token ([Discord Developer Portal](https://discord.com/developers/applications))

## Setup

### 1. Install dependencies

```bash
cd bot
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in all values:

| Variable | Description |
|---|---|
| `DISCORD_TOKEN` | Bot token from Discord Developer Portal |
| `DISCORD_CLIENT_ID` | Application ID |
| `DISCORD_CLIENT_SECRET` | OAuth2 client secret |
| `DISCORD_GUILD_ID` | Your Discord server ID |
| `BOT_API_SECRET` | Shared secret for the `/api/vulture-update` endpoint |
| `SESSION_SECRET` | Random secret for Express sessions |
| `PORT` | Port for the web server (default: 3001) |
| `BASE_URL` | Public URL of the web UI, e.g. `https://bot.lamangintel.net` |

### 3. Configure Discord OAuth2

In the [Discord Developer Portal](https://discord.com/developers/applications):

1. Go to your application → **OAuth2 → Redirects**
2. Add: `https://bot.lamangintel.net/auth/discord/callback`
   (or `http://localhost:3001/auth/discord/callback` for local dev)

### 4. Deploy slash commands

Run once to register commands with your guild:

```bash
npm run deploy-commands
```

### 5. Start the bot

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

## Web UI

Visit `http://localhost:3001` (or your `BASE_URL`) and sign in with Discord.

You must have **Manage Server** permission in the configured guild to access the dashboard.

### Pages

- **Dashboard** — Bot status, recent scheduled posts, quick Vulture update form
- **Schedule** — Create/manage recurring (cron) or one-time scheduled posts
- **Settings** — Configure Vulture channel, announcement channel, reporter role

## API

The web server exposes an internal API for the main website:

### `POST /api/vulture-update`

Posts a Vulture location embed to the configured channel.

**Auth:** `Authorization: Bearer <BOT_API_SECRET>`

**Body:**
```json
{
  "location1": "Bronco",
  "location2": "Nomad",
  "image1": "https://...",
  "image2": "https://..."
}
```

**Response:**
```json
{ "ok": true, "message": "Vulture update posted: Bronco / Nomad" }
```

## Directory Structure

```
bot/
  index.js                  Entry point
  src/
    bot.js                  Discord client + event/command loader
    deploy-commands.js      Register slash commands
    commands/
      vulture.js            /vulture command
      boss.js               /boss command
      post.js               /post command
    events/
      ready.js
      interactionCreate.js
    web/
      server.js             Express app factory
      routes/               auth, dashboard, schedule, settings, api
      middleware/
        requireAuth.js      Session + Manage Server check
      views/                EJS templates
    db/
      index.js              SQLite init + helpers
    utils/
      embeds.js             Embed builder with LIN footer
      scheduler.js          node-cron job runner
  public/
    css/style.css
    js/app.js
```

## Data Files

The bot reads these files from `../data/` (relative to the `bot/` directory):

- `bosses.json` — Boss definitions for `/boss` autocomplete and embeds
- `vulture.json` — Vulture location data for `/vulture` autocomplete

The SQLite database is stored at `bot/data/bot.db` (auto-created on first run).

## Permissions

The bot requires the following Discord permissions:
- Send Messages
- Embed Links
- Read Message History
- View Channels

Invite URL scope: `bot applications.commands`

## Production Deployment

Use a process manager like PM2:

```bash
npm install -g pm2
pm2 start index.js --name lin-bot
pm2 save
pm2 startup
```

Reverse proxy (nginx) example for the web UI:

```nginx
server {
    listen 443 ssl;
    server_name bot.lamangintel.net;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
