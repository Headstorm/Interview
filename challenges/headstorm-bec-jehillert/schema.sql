/*
TO RUN SCHeMA FILE
• All active sessions must be terminated before creating do tables.
• Active Session Termination Query:
    SELECT
        pg_terminate_backend(pid)
    FROM
        pg_stat_activity
    WHERE
        datname = 'db';
• Bash Command:
    psql service=tldb<schema.sql
*/

\c postgres jeh
DROP DATABASE IF EXISTS db;
CREATE DATABASE db;

\connect db

CREATE TABLE IF NOT EXISTS numbers (
  number_id SERIAL PRIMARY KEY,
  number NUMERIC
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO PUBLIC
