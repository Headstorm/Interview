\c postgres jeh
DROP DATABASE IF EXISTS headstorm_db;
CREATE DATABASE headstorm_db;

\connect headstorm_db

CREATE TABLE IF NOT EXISTS public.records (
    id SERIAL PRIMARY KEY,
    record_id INT UNIQUE NOT NULL
);

-- Putting the 'name' with the contact info, and separate from
-- the "Record ID" will allow the Record ID to be treated more like
-- a "customer number".    So if a past purchaser worked for a company
-- they can now add other authorized purchasers. Or allow someone
-- to authorize family members for purchases.
-- ***NOTE: Maybe change record_id to customer_number and make a note
-- of the change in the documentation.
CREATE TABLE IF NOT EXISTS public.customer (
    id SERIAL PRIMARY KEY,
    record_id INT NOT NULL,
    name TEXT NOT NULL DEFAULT '',
    cell_phone TEXT NOT NULL DEFAULT '',
    work_phone TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    address TEXT NOT NULL DEFAULT '',
    CONSTRAINT fk_record_id
        FOREIGN KEY (record_id)
        REFERENCES public.records (record_id)
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
    quantity INT NOT NULL DEFAULT '0',
    CONSTRAINT fk_record_id
        FOREIGN KEY (record_id)
        REFERENCES public.records (record_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO PUBLIC
