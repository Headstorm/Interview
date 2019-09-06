PART I COMMENTS
———————————————————————————————————————————————————————————————————————————————
  ■ Database visualization is 'headstorm_db_visualization.png' in the
    root folder.

  ■ Steps to produce:
    • created schema, created script 'load_schema.sh' to create database
      'headstorm_db' from schema file, and created headstorm_db by running
      script.
    • decided on DBVisualizer to produce visualization after reading
      https://wiki.postgresql.org/wiki/Design_Tools and feedback on forums
    • Loaded DBVisualizer, connected DBVisualizer to 'headstorm_db', and
      generated visualization.
    • Could not find a way to export as pdf, so used screen capture instead to
      save the visualization.

ASSUMPTIONS
-------------------------------------------------------------------------------
  The visualization took into consideration the following:
    • I assumed that the two "Widget Order" rows below correspond to purchase
      tallies for particular products that the customer purchased over time.
          |  Basic Widget Order      |  Number  |  37  |
          |  Advanced Widget Order   |  Number  |  12  |

    • I assumed that the protection plan covers all products associated with
      'Record ID'.

    • I avoided using types like VARCHAR(50) to avoid accidentally
      cutting off data.

    • additional comments/assumptions are included as comments to the schema
      file, which I have also copied below:

SCHEMA FILE
-------------------------------------------------------------------------------
  \c postgres jeh

  DROP DATABASE IF EXISTS headstorm_db;
  CREATE DATABASE headstorm_db;

  \connect headstorm_db

  CREATE TABLE IF NOT EXISTS public.customer (
    id SERIAL PRIMARY KEY,
    record_id INT UNIQUE NOT NULL
  );

  -- Putting the 'name' with the contact info, and separate from
  -- the "Record ID" will allow the Record ID to be treated more like
  -- a "customer number".  So if a past purchaser worked for a company
  -- they can now add other authorized purchasers. Or allow someone
  -- to authorize family members for purchases.
  -- ***NOTE: Maybe change record_id to customer_number and make a note
  -- of the change in the documentation.
  CREATE TABLE IF NOT EXISTS public.contact_info (
    id SERIAL PRIMARY KEY,
    record_id INT NOT NULL,
    name TEXT NOT NULL DEFAULT '',
    cell_phone TEXT NOT NULL DEFAULT '',
    work_phone TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    address TEXT NOT NULL DEFAULT '',
    CONSTRAINT fk_record_id
      FOREIGN KEY (record_id)
      REFERENCES public.customer (record_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
  );

  -- Instead of including "Basic Widget Order" and "Advanced Widget
  -- Order" as column fields, they will be entered as values of an
  -- "order_type" field. This will let the company add new product
  -- types whenever they want without needing to change the structure
  -- of the table.
  CREATE TABLE IF NOT EXISTS public.orders (
    id SERIAL PRIMARY KEY,
    record_id INT NOT NULL,
    order_type TEXT NOT NULL DEFAULT '',
    quanity INT NOT NULL DEFAULT '0',
    CONSTRAINT fk_record_id
      FOREIGN KEY (record_id)
      REFERENCES public.customer (record_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
  );
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO PUBLIC

INITIAL QUESTIONS
———————————————————————————————————————————————————————————————————————————————
  I was initially confused, was going to submit the following questions, but am somewhat confident that my assumptions are the correct ones.  If not, let me know, and I can revise.

    1) Are the 'Sample Value[s]' for 'Basic Widget Order' and 'Advanced Widget Order' referring to quantities, prices, or orders for products made on different dates?

    2) What do the "Basic Widget Order" and "Advanced Widget Order" rows represent:
      - a single transaction for two different products?
      - two tallies, each tally counting how many times a product of a particular type was purchased?
      - two bulk orders made on different dates (37 Basic on Date 1, 12 Advanced on Date 2).

    3) Is the Protection Plan for all widgets, a certain type of widget, widgets purchased in the transaction the Protection Plan was obtained.

PART I COMMENTS
———————————————————————————————————————————————————————————————————————————————



GRAVEYARD
———————————————————————————————————————————————————————————————————————————————
  npm run...            Description
  build Compile, bundle and minify all CSS and JS files..
  build:css Compile, autoprefix and minify all CSS files to dist/index.css.
  build:js  Compile, bundle and minify all JS files to dist/index.js.
  start Starts a server on http://localhost:3000.
  test  Run all unit and end-to-end tests.
  Installs project dependencies and dev dependencies for local execution of app and testing files.


      "pretest":db "npm scripts/generateMockData.js",
      "loadDatabase": "npm scripts/loadReloadDatabase.js",


  install   Installs project dependencies and dev dependencies for local execution of app and testing files.

  pretest   Generates mock data for running migrateData.js, which is the code requested for Part II of the Database Challenge

  test:schema Creates database based on schema file. Prerequisite: Local installation of PostgreSQL.

  test:app Runs the script for Part II of the Database Challenge:     migrateData.js.
