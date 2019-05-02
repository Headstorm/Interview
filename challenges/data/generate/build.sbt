name := "data-generator"

description := "A project to generate data files for geo location and time"

version := "0.1.0"

organization := "com.headstorm"

scalaVersion := "2.12.8"

libraryDependencies ++= Seq(
  "com.github.tototoshi" %% "scala-csv" % "1.3.5"
)

resolvers ++= Seq(
  "OSS"  at "http://oss.sonatype.org/content/repositories/releases"
)