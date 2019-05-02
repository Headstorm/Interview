import com.github.tototoshi.csv._
import java.io._

object DataGenerator {

  val rnd = new scala.util.Random

  def main(args: Array[String]): Unit = {

    val file = new File("../birthdays.csv")
    val writer = CSVWriter.open(file)
    writer.writeRow(List("Latitude", "Longitude", "Birth Date"))
    (1 to 500).foreach { i =>
      writer.writeRow(List(
        (gen(lowerBoundLat, upperBoundLat) + "." + genNths).toFloat,
        (gen(lowerBoundLong, upperBoundLong) + "." + genNths).toFloat,
        gen(lowerBoundTime, upperBoundTime)
      ))
    }

    writer.close()
  }

  def gen(start: Int, end: Int): String = (start + rnd.nextInt( (end - start) + 1 )).toString
  def genNths: Int =  rnd.nextInt(999999)

  val lowerBoundLat = 28
  val upperBoundLat = 52
  val lowerBoundLong = -122
  val upperBoundLong = -76
  val lowerBoundTime = 1514829442
  val upperBoundTime = 1556821409
}