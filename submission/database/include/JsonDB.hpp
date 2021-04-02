#ifndef JSONDB_H
#define JSONDB_H
#include <fstream>
#include <nlohmann/json.hpp>

// Headstorm challenge (hsc)...
namespace hsc {

using json = nlohmann::json;

class JsonDB {
public:
    JsonDB(const char *file_path) : file_path(file_path)
    {
        // Load json from file
        std::ifstream json_file(file_path);
        json_file >> old_system;

        // Parse json
        for (auto &record : old_system) {
            records.push_back({record});
        }
    }

    class Record {
    public:
        Record(json json_object)
        {
            record_id = json_object["Record_ID"];
            name = json_object["Name"];
            cell_phone = json_object["Cell_Phone"];
            work_phone = json_object["Work_Phone"];
            email = json_object["Email"];
            address = json_object["Address"];
            basic_order = json_object["Basic_Widget_Order"];
            advanced_order = json_object["Advanced_Widget_Order"];
            protection_plan = json_object["Protection_Plan"];
        }

        int record_id;
        std::string name;
        std::string cell_phone;
        std::string work_phone;
        std::string email;
        std::string address;
        int basic_order;
        int advanced_order;
        int protection_plan;
    };

    std::vector<Record> records;

private:
    const char *file_path;
    json old_system;
};

} // namespace hsc
#endif