const express = require("express");
const PORT = 8080;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./routes");
app.use(routes);

app.listen(PORT, () => console.log("App listening on " + PORT));
