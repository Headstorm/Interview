package com.NumberSorter.routes

import akka.actor.ActorSystem
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server._
import akka.util.Timeout
import com.NumberSorter.messages._

import scala.concurrent.{ExecutionContext, ExecutionContextExecutor}


class RestApi(system: ActorSystem, timeout: Timeout) extends RestRoutes {
  implicit val requestTimeout: Timeout = timeout
  implicit def executionContext: ExecutionContextExecutor = system.dispatcher
}

trait RestRoutes extends NumberSorterApi with EventMarshaller {
  val service = "sort-numbers"
  val version = "v1"

  // Endpoint for updating the array with numbers
  protected val createEventRoute: Route = {
    pathPrefix(service / version / "data" ) {
      post {
        // POST sort-numbers/v1/events/event_name
        pathEndOrSingleSlash {
          entity(as[EventDescription]) { event =>
            complete(updateArray(event.numbers))
          }
        }
      }
    }
  }

  // Endpoint for getting the sorted array of numbers
  protected val getAllEventsRoute: Route = {
    pathPrefix(service / version / "data") {
      get {
        // GET sort-numbers/v1/events
        pathEndOrSingleSlash {
          complete(OK, getEvents)
        }
      }
    }
  }

  // Endpoint for inserting a new number into the array of numbers
  protected val insertNewNumberRoute: Route = {
    pathPrefix(service / version / "data" ) {
      patch {
        // PATCH sort-numbers/v1/events
        pathEndOrSingleSlash {
          entity(as[EventNewNumber]) { event =>
            complete(insertIntoNumberArray(event.newNumber))
          }
        }
      }
    }
  }

  val routes: Route = createEventRoute ~ getAllEventsRoute ~ insertNewNumberRoute
}

trait NumberSorterApi {
  implicit def executionContext: ExecutionContext
  implicit def requestTimeout: Timeout

  var numbers = Vector.empty[Int]

  def updateArray(unsortedNumbers: Vector[Int]): Vector[Int] = {
    numbers = unsortedNumbers.sorted
    numbers
  }

  def insertIntoNumberArray(newNumber: Int): Vector[Int] = {
    numbers = (numbers :+ newNumber).sorted
    numbers
  }

  def getEvents: Vector[Int] = numbers
}
