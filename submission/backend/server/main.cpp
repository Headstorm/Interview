#include <iostream>
#include "Server.hpp"
#include "InterruptHandler.hpp"

int main(int, char **)
{
    // Initialize server and set interrupt hook
    hsc::Server server;
    server.initializeHandlers();
    hsc::InterruptHandler::hookSIGINT();

    try {

        // Start server, begin listening for requests at http://localhost:8080
        server.accept().wait();

        hsc::InterruptHandler::waitForInput();

        server.shutdown().wait();
    }
    catch (std::exception &ex) {
        std::cerr << "EXCEPTION: " << ex.what() << std::endl;
    }
    return 0;
}
