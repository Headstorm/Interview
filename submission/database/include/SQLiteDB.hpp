#ifndef SQLITEDB_H
#define SQLITEDB_H
#include <sqlite3.h>
#include <fmt/core.h>
#include <string>
#include "JsonDB.hpp"

// Headstorm challenge (hsc)...
namespace hsc {

class SQLiteDB {
public:
    SQLiteDB(const char *file_path)
        : file_path(file_path), database(nullptr), handle(0), error_msg(0)
    {
    }

    // Open the local SQLite database
    bool open()
    {
        handle = sqlite3_open(file_path, &database);
        if (handle) {
            fmt::print("'{}': Cannot open database: {}\n\n", file_path,
                       sqlite3_errmsg(database));
            return false;
        }
        else {
            fmt::print("'{}': Database opened successfully\n\n", file_path);
            return true;
        }
    }

    // Create contact table in the local SQLite database
    void createContactTable()
    {
        std::string sql = contact_table_sql();
        handle = sqlite3_exec(database, sql.c_str(), callback, 0, &error_msg);

        if (handle != SQLITE_OK) {
            fmt::print("SQL ERROR: {}\n\n", error_msg);
            sqlite3_free(error_msg);
        }
        else {
            fmt::print("SQL SUCCESS: Table creation\n\n");
        }
    }

    // Insert a record into the local SQLite database's contact table
    void insertRecord(JsonDB::Record record)
    {
        std::string sql = fmt::format(
            insert_fmt(), record.record_id, record.name, record.cell_phone,
            record.work_phone, record.email, record.address, record.basic_order,
            record.advanced_order, record.protection_plan);

        handle = sqlite3_exec(database, sql.c_str(), callback, 0, &error_msg);
        fmt::print(sql);
        std::cout << '\n';

        if (handle != SQLITE_OK) {
            fmt::print("SQL ERROR: {}\n\n", error_msg);
            sqlite3_free(error_msg);
        }
        else {
            fmt::print("SQL SUCCESS: Insertion Success.\n\n");
        }
    }

    // Close the local SQLite database
    void close() { sqlite3_close(database); }

private:
    const char *file_path;
    sqlite3 *database;
    int handle;
    char *error_msg;

    // Callback method for sqlite3_exec()
    static int callback(void *, int argc, char **argv, char **column_name)
    {
        for (int i = 0; i < argc; ++i) {
            fmt::print("{} = {}\n", column_name[i], argv[i] ? argv[i] : "NULL");
        }
        std::cout << '\n';
        return 0;
    }

    // static string return
    static std::string insert_fmt()
    {
        static std::string fmt =
            "INSERT INTO contacts (record_id, name, cell_phone, work_phone, "
            "email, address, basic_order, advanced_order, protection_plan)\n "
            "  VALUES ({}, '{}', '{}', '{}', '{}', '{}', {}, {}, {});";
        return fmt;
    }

    // static string return
    static std::string contact_table_sql()
    {
        static std::string str = "CREATE TABLE IF NOT EXISTS contacts ("
                                 "  record_id INTEGER PRIMARY KEY,\n"
                                 "  name TEXT NOT NULL,\n"
                                 "  cell_phone TEXT NOT NULL,\n"
                                 "  work_phone TEXT NOT NULL,\n"
                                 "  email TEXT NOT NULL,\n"
                                 "  address TEXT NOT NULL,\n"
                                 "  basic_order INTEGER NOT NULL,\n"
                                 "  advanced_order INTEGER NOT NULL,\n"
                                 "  protection_plan INTEGER NOT NULL\n);";
        return str;
    }
};

} // namespace hsc
#endif