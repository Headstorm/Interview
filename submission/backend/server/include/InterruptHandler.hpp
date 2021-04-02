#ifndef INTERRUPTHANDLER_H
#define INTERRUPTHANDLER_H
#include <condition_variable>
#include <mutex>
#include <iostream>
#include <signal.h>

namespace hsc {

std::mutex mutex;
std::condition_variable condition;

class InterruptHandler {
public:
    static void hookSIGINT() { signal(SIGINT, handleInterrupt); }

    static void handleInterrupt(int signal)
    {
        if (signal == SIGINT) {
            std::cout << "SIGINT trapped ..." << '\n';
            condition.notify_one();
        }
    }
    static void waitForInput()
    {
        std::unique_lock<std::mutex> lock{mutex};
        condition.wait(lock);
        std::cout << "Program Interrupt\n" << '\n';
        lock.unlock();
    }
};

} // namespace hsc

#endif