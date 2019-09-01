/* "psql service=tldb<terminate-postgres-sessions.sql" */
\c postgres jeh

SELECT
    pg_terminate_backend(pid)
FROM
    pg_stat_activity
WHERE
    datname = 'db';
