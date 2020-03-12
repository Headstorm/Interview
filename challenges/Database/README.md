# Headstorm Database Challenge

by Javier Castro

## How to run

1. Import project into Java-compatible IDE as Maven Project from Database directory.
2. Run `DatabaseMigration.java` located on `src\main\java\Javier\DatabaseMigrationTool` directory.

NOTE: This is a Maven project and as such will manage dependencies stated in `pom.xml` automatically.

## How to test - Part 1

1. Open `Relational_DB_Visulization.png` located on `src\main\resources` directory.

## How to test - Part 2

1. Replace contents of `NoSQL_records.json` located on `src\main\resources` directory.

    Java App expects the following JSON format:
    ```
    {
        "NoSQL Dump": [
            {
                "Record ID": 1234,
                "Name": "Joe Smith",
                "Cell Phone": "405.867.5309",
                "Work Phone": "123.123.1234",
                "Email": "joe_w@gmail.com",
                "Address": "123 Vic Way, Dallas TX 75001",
                "Basic Widget Order": 37,
                "Advanced Widget Order": 12,
                "Protection Plan": true
            },

            ...
        ]
    }
    ```

2. Run this project.
    > MySQL statements are printed to console.
3. Create DB on DB manager of choice.
4. Copy and paste MySQL statements into DB manager of choice.
5. Execute query.
6. Tables will be created and insertions will be made according to the contents of `NoSQL_records.json` following the schema in `Relational_DB_Visulization.png`.

    NOTE: This project was developed to migrate NoSQL records into MySQL DB.
