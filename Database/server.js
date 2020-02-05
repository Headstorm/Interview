// Dependencies
var express = require("express");

// Initialize Express
var app = express();

// Routes
// =============================================================
require("./apiRoutes")(app);


// Set the app to listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});
