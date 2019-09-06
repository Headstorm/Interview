# Solution for Headstorm Database Challenge

Additional documentation for this project may be found ".notes/README - Applicant's Notes.txt".

## Part I - Relational Data Model Visualization

![Visualization of database schema](https://github.com/jehillert/Interview/blob/master/challenges/headstorm-dbc-jehillert/headstorm_db_visualization.png)

![Visualization of database schema](./headstorm_db_visualization.png)

## Part II - Data Migration

The following table is a reference for installing and running the scripts for Part II of this challenge.

| npm run...  | Description                                                                                                       |
|-------------|-------------------------------------------------------------------------------------------------------------------|
| install     | Installs project dependencies and dev dependencies for local execution of app and testing files.                  |
| pretest     | Generates mock data for running migrateData.js, which is the code requested for Part II of the Database Challenge |
| test:schema | Creates database based on schema file. Prerequisite: Local installation of PostgreSQL.                            |
| test:app    | Runs the script for Part II of the Database Challenge: dataMigrationScript.js.                                    |
