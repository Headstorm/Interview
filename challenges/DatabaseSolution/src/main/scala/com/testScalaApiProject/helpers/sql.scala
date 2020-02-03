package com.testScalaApiProject.helpers

import com.testScalaApiProject.models.{Order, User}

object sql {
  def printSection(sectionTitle: String): Unit = {
    println(
      "================================================\n" +
        s"      SQL command to $sectionTitle   \n" +
        "================================================\n")
  }

  def printUserSqlCommands(users: Vector[User]): Unit = {
    printSection("Insert Users")
    var sqlCommandPrefix = "INSERT INTO Users\n"
    for (user <- users) sqlCommandPrefix += generateSqlCommand(user)
    println(sqlCommandPrefix)
  }

  def printOrderSqlCommands(orders: Vector[Order]): Unit = {
    printSection("Insert Orders")
    var sqlCommandPrefix = "INSERT INTO Orders\n"
    for (order <- orders) sqlCommandPrefix += generateSqlCommand(order)
    println(sqlCommandPrefix)
  }

  def printCreateUsersTable(): Unit = {
    printSection("Create a new Users table:")
    println(generateCommandToCreateUsersTable())
  }

  def printCreateOrdersTable(): Unit = {
    printSection("Create a new Orders table:")
    println(generateCommandToCreateOrdersTable())
  }

  def generateCommandToCreateUsersTable(): String =
    "CREATE TABLE Users (\n" +
    "  RecordID int NOT NULL,\n" +
    "  Name varchar(255),\n" +
    "  CellPhone varchar(255),\n" +
    "  WorkPhone varchar(255),\n" +
    "  Email varchar(255),\n" +
    "  Address varchar(255),\n" +
    "  PRIMARY KEY (RecordID)\n" +
    ");\n"

  def generateCommandToCreateOrdersTable(): String =
    "CREATE TABLE Orders (\n" +
    "  OrderID int NOT NULL,\n"+
    "  BasicWidgetOrder int,\n"+
    "  AdvancedWidgetOrder int,\n"+
    "  ProtectionPlan boolean,\n"+
    "  RecordID int NOT NULL,\n"+
    "  PRIMARY KEY (OrderID),\n"+
    "  FOREIGN KEY (RecordID) REFERENCES Users(RecordID)\n"+
    ");\n"

  def generateSqlCommand(user: User): String = {
    val id = user.recordID
    val name = user.name
    val cellPhone = user.cellPhone
    val workPhone = user.workPhone
    val email = user.email
    val address = user.address

    s"VALUES ($id, $name, $cellPhone, $workPhone, $email, $address);\n"
  }

  def generateSqlCommand(order: Order): String = {
    val id = order.recordID
    val basicWidgetOrder = order.basicWidgetOrder
    val advancedWidgetOrder = order.advancedWidgetOrder
    val protectionPlan = order.protectionPlan

    s"VALUES ($id, $basicWidgetOrder, $advancedWidgetOrder, $protectionPlan);\n"
  }
}
