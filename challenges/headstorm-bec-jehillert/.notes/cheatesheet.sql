\c db;
\! clear
-- ———————————————————————————————————————————————————————————————————————————————
-- DESCRIBE TABLE
\dt json_lists;
\dt sorted_list;
\dt unsorted;

-- DESCRIBE TABLE (in detail)
\d+ json_lists;
\d+ sorted_list;
\d+ unsorted;

-- DESCRIBE ALL TABLES (\t general; \+ detailed)
\d+ json_lists; \d+ sorted_list; \d+ unsorted;
\dt json_lists; \dt sorted_list; \dt unsorted;
-- ———————————————————————————————————————————————————————————————————————————————
-- SHOW TABLES
SELECT * FROM json_lists;
SELECT * FROM sorted_list;
SELECT * FROM unsorted;

SELECT * FROM json_lists; SELECT * FROM sorted_list; SELECT * FROM unsorted;

-- INSERTING ARRAY
UPDATE test t
SET    column2 = a.column2
FROM   unnest('{2,3,5,23,4}'::int[]) WITH ORDINALITY a(column2, column1)
WHERE  t.column1 = a.column1;

-- ———————————————————————————————————————————————————————————————————————————————

UPDATE unsorted SET column2 = (ARRAY[2,3,5,23,4])[column1];
UPDATE unsorted SET unsorted_val = (ARRAY[2,3,5,23,4])[unsorted_id];

SELECT * FROM unsorted;


UPDATE integer_tbl t
SET    element_value = a.element_value
FROM   unnest('{2,3,5,23,4}'::int[]) WITH ORDINALITY a(element_value, element_id)
WHERE  t.element_id = a.element_id;

CREATE TABLE IF NOT EXISTS integer_tbl (
  element_id SERIAL PRIMARY KEY,
  element_value INTEGER NOT NULL
);


INSERT INTO unsorted VALUES
———————————————————————————————————————————————————————————————————————————————
INSERT INTO table(column1,column2,...)
SELECT column1,column2,...
FROM another_table
WHERE condition;
———————————————————————————————————————————————————————————————————————————————

THIS WORKED IN THE TERMINAL:
  INSERT INTO unsorted(unsorted_val)
  SELECT * FROM UNNEST (ARRAY[-5149,-1573,8342,-4624...]);

INSERT INTO unsorted(unsorted_val) SELECT * FROM UNNEST($1)
INSERT INTO unsorted(unsorted_val) SELECT * FROM UNNEST($1::numeric[])
INSERT INTO unsorted(unsorted_val) SELECT * FROM UNNEST($1::[])
INSERT INTO unsorted(unsorted_val) SELECT * FROM UNNEST ARRAY[$1]


let strList = String(list).replace(/[|]/gi, '');


    text: `INSERT INTO tsd_stream (js) SELECT unnest(string_to_array(left($1, -${delimiter.length}), '${delimiter}')::jsonb[])`,

STRING_TO_ARRAY(string, delimiter, optional_null_string)

list
const delimiter = ',';


INSERT INTO unsorted(unsorted_val) SELECT * FROM UNNEST(STRING_TO_ARRAY($1, $2))
