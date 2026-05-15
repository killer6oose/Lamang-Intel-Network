-- LIN Builder - Saved Builds Schema
-- Run this once against your MySQL database:
--   mysql -u YOUR_DB_USER -p YOUR_DB_NAME < schema.sql

CREATE TABLE IF NOT EXISTS steam_users (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    steam_id   VARCHAR(20)  NOT NULL UNIQUE,
    username   VARCHAR(100) NOT NULL DEFAULT '',
    avatar     VARCHAR(500) NOT NULL DEFAULT '',
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_steam_id (steam_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS saved_builds (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id    INT UNSIGNED NOT NULL,
    name       VARCHAR(200) NOT NULL DEFAULT 'Untitled Build',
    encoded    TEXT         NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES steam_users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
