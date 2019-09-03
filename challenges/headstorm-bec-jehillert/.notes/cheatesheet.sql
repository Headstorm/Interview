\c db;
\! clear
-- ———————————————————————————————————————————————————————————————————————————————
-- DESCRIBE TABLE
\dt json_lists;
\dt sorted_list;
\dt unsorted_list;

-- DESCRIBE TABLE (in detail)
\d+ json_lists;
\d+ sorted_list;
\d+ unsorted_list;

-- DESCRIBE ALL TABLES (\t general; \+ detailed)
\d+ json_lists; \d+ sorted_list; \d+ unsorted_list;
\dt json_lists; \dt sorted_list; \dt unsorted_list;
-- ———————————————————————————————————————————————————————————————————————————————
-- SHOW TABLES
SELECT * FROM json_lists;
SELECT * FROM sorted_list;
SELECT * FROM unsorted_list;

SELECT * FROM json_lists; SELECT * FROM sorted_list; SELECT * FROM unsorted_list;

-- INSERTING ARRAY
UPDATE test t
SET    column2 = a.column2
FROM   unnest('{2,3,5,23,4}'::int[]) WITH ORDINALITY a(column2, column1)
WHERE  t.column1 = a.column1;

-- ———————————————————————————————————————————————————————————————————————————————

UPDATE unsorted_list SET column2 = (ARRAY[2,3,5,23,4])[column1];
UPDATE unsorted_list SET unsorted_element_value = (ARRAY[2,3,5,23,4])[unsorted_element_id];

SELECT * FROM unsorted_list;


UPDATE integer_tbl t
SET    element_value = a.element_value
FROM   unnest('{2,3,5,23,4}'::int[]) WITH ORDINALITY a(element_value, element_id)
WHERE  t.element_id = a.element_id;

CREATE TABLE IF NOT EXISTS integer_tbl (
  element_id SERIAL PRIMARY KEY,
  element_value INTEGER NOT NULL
);




INSERT INTO unsorted_list VALUES
———————————————————————————————————————————————————————————————————————————————
INSERT INTO table(column1,column2,...)
SELECT column1,column2,...
FROM another_table
WHERE condition;
———————————————————————————————————————————————————————————————————————————————







INSERT INTO unsorted_list(unsorted_element_value)
SELECT * FROM UNNEST (ARRAY[-5149,-1573,8342,-4624...]);

INSERT INTO unsorted_list(unsorted_element_value)
SELECT * FROM UNNEST ($1);
