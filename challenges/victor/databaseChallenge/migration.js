const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "headStormClientDB"
});

// assumes new database is created and being used in MySQL *****

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  dataMigrate(data);
});

// grab old database data with a find() command
data = {
  recordID: 1234,
  name: "Joe Smith",
  cellPhone: "405.867.5309",
  workPhone: "123.123.1234",
  email: "joe_s@gmail.com",
  address: "123 Vic Way, Dallas TX 75001",
  basicWidget: 37,
  advancedWidget: 12,
  protectionPlan: true
};

function dataMigrate(data) {
  // grab keys and values from JSON data object
  const keys = Object.keys(data);
  const {
    recordID,
    name,
    cellPhone,
    workPhone,
    email,
    address,
    basicWidget,
    advancedWidget,
    protectionPlan
  } = data;

  // create new mySQL table with JSON returned from old database
  console.log(
    "CREATE TABLE records (" +
      keys[0] +
      " INT NOT NULL, " +
      keys[1] +
      " VARCHAR(45) NOT NULL, " +
      keys[2] +
      " VARCHAR(17) NOT NULL, " +
      keys[3] +
      " VARCHAR(17) NOT NULL, " +
      keys[4] +
      " VARCHAR(45) NOT NULL, " +
      keys[5] +
      " VARCHAR(50) NOT NULL, " +
      keys[6] +
      " INT NOT NULL, " +
      keys[7] +
      " INT NOT NULL, " +
      keys[8] +
      " BOOLEAN NOT NULL DEFAULT 0)"
  );
  // create new mySQL input into table with variables from old database
  console.log(
    "INSERT INTO records (" +
      keys[0] +
      ", " +
      keys[1] +
      ", " +
      keys[2] +
      ", " +
      keys[3] +
      ", " +
      keys[4] +
      ", " +
      keys[5] +
      ", " +
      keys[6] +
      ", " +
      keys[7] +
      ", " +
      keys[8] +
      ")"
  );
  console.log(
    "VALUES (" +
      recordID +
      ", " +
      name +
      ", " +
      cellPhone +
      ", " +
      workPhone +
      ", " +
      email +
      ", " +
      address +
      ", " +
      basicWidget +
      ", " +
      advancedWidget +
      ", " +
      protectionPlan +
      ")"
  );
}
