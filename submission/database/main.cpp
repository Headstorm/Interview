#include <iostream>
#include "JsonDB.hpp"
#include "SQLiteDB.hpp"

int main(int, char **)
{

    hsc::JsonDB old_db("../../old-system/db.json");
    hsc::SQLiteDB new_db("../../new-system/db.db");

    new_db.open();

    for (auto &record : old_db.records) {
        new_db.insertRecord(record);
    }

    new_db.close();
}
