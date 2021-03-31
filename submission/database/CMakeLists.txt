cmake_minimum_required(VERSION 3.0.0)

project(database-challenge VERSION 0.1.0)
set(PROJECT database-challenge)

include(CTest)
enable_testing()

include_directories(include)

find_package(nlohmann_json CONFIG REQUIRED)
find_package(unofficial-sqlite3 CONFIG REQUIRED)
find_package(fmt CONFIG REQUIRED)


add_executable(${PROJECT} main.cpp include/SQLiteDB.hpp include/JsonParser.hpp)
target_link_libraries(${PROJECT} PRIVATE unofficial::sqlite3::sqlite3 nlohmann_json nlohmann_json::nlohmann_json fmt::fmt)

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)
