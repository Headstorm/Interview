package com.testScalaApiProject.models

import play.api.libs.json.{JsValue}

case class OldRecord(recordID: Int,
                     name: String,
                     cellPhone: String,
                     workPhone: String,
                     email: String,
                     address: String,
                     basicWidgetOrder: Int,
                     advancedWidgetOrder: Int,
                     protectionPlan: Boolean) {


  def this(jsonObject: JsValue) = this(
    (jsonObject \ "record_id").as[Int],
    (jsonObject \ "name").as[String],
    (jsonObject \ "cell_phone").as[String],
    (jsonObject \ "work_phone").as[String],
    (jsonObject \ "email").as[String],
    (jsonObject \ "address").as[String],
    (jsonObject \ "basic_widget_order").as[Int],
    (jsonObject \ "advanced_widget_order").as[Int],
    (jsonObject \ "protection_plan").as[Boolean])
}

case class User(recordID: Int,
                name: String,
                cellPhone: String,
                workPhone: String,
                email: String,
                address: String) {

  def this(oldRecord: OldRecord) =
    this(oldRecord.recordID,
      oldRecord.name,
      oldRecord.cellPhone,
      oldRecord.workPhone,
      oldRecord.email,
      oldRecord.address)
}

case class Order(recordID: Int,
                 basicWidgetOrder: Int,
                 advancedWidgetOrder: Int,
                 protectionPlan: Boolean) {

  def this(oldRecord: OldRecord) =
    this(oldRecord.recordID,
      oldRecord.basicWidgetOrder,
      oldRecord.advancedWidgetOrder,
      oldRecord.protectionPlan)
}
