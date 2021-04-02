cmake_minimum_required(VERSION 3.0.0)

project(backend-challenge VERSION 0.1.0)
set(PROJECT backend-challenge)

include(CTest)
enable_testing()

include_directories(include)

find_package(cpprestsdk CONFIG REQUIRED)
find_package(fmt CONFIG REQUIRED)

add_executable(${PROJECT} main.cpp include/Server.hpp include/Controller.hpp include/InterruptHandler.hpp)
target_link_libraries(${PROJECT} PRIVATE fmt::fmt cpprestsdk::cpprest cpprestsdk::cpprestsdk_zlib_internal cpprestsdk::cpprestsdk_brotli_internal)

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)
