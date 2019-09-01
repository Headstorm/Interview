/*
  DESCRIPTION:
    Public schema file for dev database.

  PREREQUISITE:
    All active sessions must be terminated

  QUERY TO TERMINATE ACTIVE SESSIONS
    SELECT
        pg_terminate_backend(pid)
    FROM
        pg_stat_activity
    WHERE
        datname = 'db';

  BASH COMMAND TO RUN THIS FILE:
    psql service=tldb<schema.sql
*/

\c postgres jeh
DROP DATABASE IF EXISTS db;
CREATE DATABASE db;

\connect db

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  hash VARCHAR,
  salt VARCHAR
);

CREATE TABLE IF NOT EXISTS user_settings (
  settings_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  card_col_display_config INT NOT NULL DEFAULT 0,
  current_theme TEXT DEFAULT '',
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS entries (
  entry_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  creation_date TIMESTAMPTZ NOT NULL DEFAULT Now(),
  release_date TIMESTAMPTZ NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS session (
  sid VARCHAR NOT NULL COLLATE "default",
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO PUBLIC
