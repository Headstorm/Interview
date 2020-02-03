package com.NumberSorter.messages

import de.heikoseeberger.akkahttpplayjson._
import play.api.libs.json._

// message containing the initial number of tickets for the event
case class EventDescription(numbers: Vector[Int]) {
  require(numbers.length == 500)
}

// message containing the initial number of tickets for the event
case class EventNewNumber(newNumber: Int) {
  require(newNumber > 0)
}

// message containing an error
case class Error(message: String)

// convert our case classes from and to JSON
trait EventMarshaller extends PlayJsonSupport {

  implicit val eventDescriptionFormat: OFormat[EventDescription] = Json.format[EventDescription]
  implicit val eventNewNumberFormat: OFormat[EventNewNumber] = Json.format[EventNewNumber]
  implicit val errorFormat: OFormat[Error] = Json.format[Error]
}

object EventMarshaller extends EventMarshaller
