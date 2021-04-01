#include <iostream>
#include "JsonDB.hpp"
#include "SQLiteDB.hpp"

int main(int, char **)
{
    // Open local jsonDB (auto parses)
    hsc::JsonDB old_db("../../old-system/db.json");

    // Open local SQLite database
    hsc::SQLiteDB new_db("../../new-system/db.db");
    new_db.open();

    // Insert each record from old database into new database
    for (auto &record : old_db.records) {
        new_db.insertRecord(record);
    }

    // Finished
    new_db.close();
}
