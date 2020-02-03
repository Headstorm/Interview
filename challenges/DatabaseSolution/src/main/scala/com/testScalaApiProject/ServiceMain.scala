package com.testScalaApiProject

import com.testScalaApiProject.helpers.sql.{printCreateOrdersTable, printCreateUsersTable, printOrderSqlCommands, printUserSqlCommands}
import com.testScalaApiProject.models.{OldRecord, Order, User}

import scala.io.Source
import play.api.libs.json.{JsValue, Json}

object ServiceMain extends App {
  val source : Source = Source.fromResource("mockDatabase.json")
  val sourceAsString = source.mkString
  val json = try {  Json.parse(sourceAsString).as[Vector[JsValue]] } finally { source.close() }

  // Step 1: Create SQL tables
  printCreateUsersTable()
  printCreateOrdersTable()

  // Step 2: Convert Old Records to Users and Orders
  val allRecords: Vector[OldRecord] = json.map(new OldRecord(_))
  val allUsers: Vector[User] = allRecords.map(new User(_))
  val allOrders: Vector[Order] = allRecords.map(new Order(_))

  // Step 3: Print SQL commands to insert Users and Orders into their new tables
  printUserSqlCommands(allUsers)
  printOrderSqlCommands(allOrders)
}


