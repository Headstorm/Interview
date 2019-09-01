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

CREATE TABLE IF NOT EXISTS list_sets (
  list_set_id SERIAL PRIMARY KEY,
  unsorted_json_list JSONB
);

CREATE TABLE IF NOT EXISTS sorted_list (
  sorted_list_val_id SERIAL PRIMARY KEY,
  list_set_id INT NOT NULL,
  sorted_value NUMERIC NOT NULL,
  CONSTRAINT fk_list_set
    FOREIGN KEY (list_set_id)
    REFERENCES list_sets (list_set_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS unsorted_list (
  unsorted_list_val_id SERIAL PRIMARY KEY,
  list_set_id INT NOT NULL,
  unsorted_value NUMERIC NOT NULL,
  CONSTRAINT fk_list_set
    FOREIGN KEY (list_set_id)
    REFERENCES list_sets (list_set_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO PUBLIC

-- CREATE TABLE IF NOT EXISTS numbers (
--   number_id SERIAL PRIMARY KEY,
--   number NUMERIC
-- );

-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO PUBLIC
