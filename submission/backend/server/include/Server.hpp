#ifndef SERVER_H
#define SERVER_H
#include <vector>
#include <map>
#include <cpprest/http_listener.h>
#include <cpprest/json.h>
#include <fmt/core.h>
#include "Controller.hpp"

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

// Headstorm Challenge (hcs)...
namespace hsc {

class Server : public Controller {
public:
    Server() : Controller(), data_vector(500, 0) {}

    void initializeHandlers() override
    {
        listener->support(methods::GET, std::bind(&Server::handleGet, this,
                                                  std::placeholders::_1));
        listener->support(methods::POST, std::bind(&Server::handlePost, this,
                                                   std::placeholders::_1));
        listener->support(methods::PATCH, std::bind(&Server::handlePatch, this,
                                                    std::placeholders::_1));
    }

    void handleGet(http_request message) override
    {
        auto path = requestPath(message);

        // Check for /data path
        if (!path.empty() && path[0] == L"data") {

            // convert data_vector (vector<int>) into a vector<json::value>
            std::vector<json::value> json_response;
            for (auto &num : data_vector) {
                json_response.push_back(num);
            }

            message.reply(status_codes::OK, json::value::array(json_response));
        }
        message.reply(status_codes::NotFound);
    }

    void handlePost(http_request message) override
    {
        auto path = requestPath(message);

        // Check for /data path
        if (!path.empty() && path[0] == L"data") {

            // Exctract 'data' array from request message
            auto json = message.extract_json().get();
            auto array = json[L"data"];

            // Check if 'data' field actually exists and is an array
            if (array == NULL || !array.is_array()) {
                message.reply(status_codes::BadRequest,
                              L"Error: 'data' array is invalid");
                return;
            }

            auto data = array.as_array();

            // Check data for non-numbers, then push into data_vector
            data_vector.clear();
            for (auto &val : data) {
                if (!val.is_number()) {
                    message.reply(status_codes::BadRequest,
                                  L"Error: 'data' array contains a non "
                                  L"number value.");
                    return;
                }
                data_vector.push_back(val.as_number().to_int32());
            }

            // Confirm array size of 500
            if (data_vector.size() != 500) {
                message.reply(status_codes::BadRequest,
                              L"Error: 'data' array does not contain exactly "
                              L"500 numbers");
                return;
            }

            // Sort data....
            std::sort(data_vector.begin(), data_vector.end());
            message.reply(status_codes::OK,
                          L"Success: 'data' array was posted to /data");
        }
        message.reply(status_codes::NotFound);
    }

    void handlePatch(http_request message) override
    {
        auto path = requestPath(message);

        // Check for /data path
        if (!path.empty() && path[0] == L"data") {

            // Exctract 'insert' field from request message
            auto json = message.extract_json().get();
            auto value = json[L"insert"];

            // Check if 'insert' field actually exists and is a number
            if (value == NULL) {
                message.reply(status_codes::BadRequest,
                              L"Error: 'insert' value is NULL");
                return;
            }
            else if (!value.is_number()) {
                message.reply(status_codes::BadRequest,
                              L"Error: 'insert' value is not a number");
                return;
            }

            // Insert value into sorted vector
            int val = value.as_number().to_int32();
            data_vector.insert(
                std::upper_bound(data_vector.begin(), data_vector.end(), val),
                val);

            // Remove last element, only 500 allowed
            int last = data_vector.back();
            data_vector.pop_back();

            auto str = fmt::format(
                "Success: '{}' was patched to /data and '{}' was removed.", val,
                last);
            std::wstring str1(str.begin(), str.end());

            message.reply(status_codes::OK, str1);
        }
        message.reply(status_codes::NotFound);
    }

    std::vector<int> data_vector;
};

} // namespace hsc

#endif