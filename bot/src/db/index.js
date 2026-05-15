'use strict';

// Uses Node.js built-in sqlite (node:sqlite) - available from Node 22.5+.
// No native compilation required - drop-in for better-sqlite3 on this codebase.
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DB_DIR  = path.join(__dirname, '../../data');
const DB_PATH = path.join(DB_DIR, 'bot.db');

let db;

function initDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  db = new DatabaseSync(DB_PATH);

  db.exec(`PRAGMA journal_mode = WAL`);

  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS scheduled_posts (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      channel_id   TEXT    NOT NULL,
      content      TEXT    NOT NULL,
      schedule     TEXT    NOT NULL,
      is_recurring INTEGER DEFAULT 1,
      enabled      INTEGER DEFAULT 1,
      last_run     TEXT,
      created_at   TEXT    DEFAULT (datetime('now'))
    );
  `);

  console.log(`[DB] Database ready at ${DB_PATH}`);
  return db;
}

function getDb() {
  if (!db) throw new Error('Database not initialized. Call initDb() first.');
  return db;
}

// ---- Settings helpers ----

function getSetting(key, defaultValue = null) {
  const stmt = getDb().prepare('SELECT value FROM settings WHERE key = ?');
  const row  = stmt.get(key);
  return row ? row.value : defaultValue;
}

function setSetting(key, value) {
  getDb()
    .prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
    .run(key, value);
}

function getAllSettings() {
  const rows   = getDb().prepare('SELECT key, value FROM settings').all();
  const result = {};
  for (const row of rows) result[row.key] = row.value;
  return result;
}

// ---- Scheduled post helpers ----

function getScheduledPosts(enabledOnly = false) {
  const sql = enabledOnly
    ? 'SELECT * FROM scheduled_posts WHERE enabled = 1 ORDER BY created_at DESC'
    : 'SELECT * FROM scheduled_posts ORDER BY created_at DESC';
  return getDb().prepare(sql).all();
}

function getScheduledPost(id) {
  return getDb().prepare('SELECT * FROM scheduled_posts WHERE id = ?').get(id);
}

function createScheduledPost({ channel_id, content, schedule, is_recurring = 1, enabled = 1 }) {
  const result = getDb()
    .prepare(
      'INSERT INTO scheduled_posts (channel_id, content, schedule, is_recurring, enabled) VALUES (?, ?, ?, ?, ?)'
    )
    .run(
      channel_id,
      typeof content === 'object' ? JSON.stringify(content) : content,
      schedule,
      is_recurring,
      enabled
    );
  return result.lastInsertRowid;
}

function updateScheduledPost(id, fields) {
  const allowed = ['channel_id', 'content', 'schedule', 'is_recurring', 'enabled', 'last_run'];
  const sets    = [];
  const values  = [];
  for (const [k, v] of Object.entries(fields)) {
    if (allowed.includes(k)) {
      sets.push(`${k} = ?`);
      values.push(typeof v === 'object' && v !== null ? JSON.stringify(v) : v);
    }
  }
  if (sets.length === 0) return;
  values.push(id);
  getDb().prepare(`UPDATE scheduled_posts SET ${sets.join(', ')} WHERE id = ?`).run(...values);
}

function deleteScheduledPost(id) {
  getDb().prepare('DELETE FROM scheduled_posts WHERE id = ?').run(id);
}

function markPostRan(id) {
  getDb()
    .prepare("UPDATE scheduled_posts SET last_run = datetime('now') WHERE id = ?")
    .run(id);
}

module.exports = {
  initDb,
  getDb,
  getSetting,
  setSetting,
  getAllSettings,
  getScheduledPosts,
  getScheduledPost,
  createScheduledPost,
  updateScheduledPost,
  deleteScheduledPost,
  markPostRan,
};
