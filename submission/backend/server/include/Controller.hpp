#ifndef CONTROLLER_H
#define CONTROLLER_H
#include <cpprest/http_listener.h>
#include <cpprest/http_msg.h>
#include <pplx/pplxtasks.h>

using namespace web;
using namespace http;
using namespace http::experimental::listener;

// Headstorm Challenge (hcs)...
namespace hsc {

class Controller {
public:
    Controller()
    {
        listener.reset(new http_listener(L"http://localhost:8080"));
    }

    // Concurrent task to initialize handlers and open the http_listener
    pplx::task<void> accept()
    {
        initializeHandlers();
        return listener->open();
    }

    // Concurrent task to close the http_listener
    pplx::task<void> shutdown() { return listener->close(); }

    // Returns the relative path of an http_request
    std::vector<utility::string_t> requestPath(const http_request &msg)
    {
        auto path = uri::decode(msg.relative_uri().path());
        return uri::split_path(path);
    }

    // Interface methods
    virtual void handleGet(http_request message) = 0;
    virtual void handlePost(http_request message) = 0;
    virtual void handlePatch(http_request message) = 0;
    virtual void initializeHandlers() = 0;

protected:
    std::unique_ptr<http_listener> listener;
};

} // namespace hsc
#endif