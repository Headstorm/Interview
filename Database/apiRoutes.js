// Database configuration
// Save the URL of the database as well as the name of the collection
var databaseUrl = "users";
var collections = ["users"];
var mongojs = require("mongojs");


// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function (error) {
    console.log("Database Error:", error);
});

let user = [];


module.exports = (app) => {

    app.get("/", (req, res) => {
        // Query: qury the MongoDB collection
        db.users.find({}, function (err, found) {
            // Log any errors if the server encounters one
            if (err) {
                console.log(err);
            }
            // Otherwise, send the results to the browser
            else {
                for (i = 0; i < found.length; i++) {
                    user.push(found[i])
                }
                // Sending data from Mongo database to server to check against SQL statmenets printed in console
                res.json(found);

                // For proper logging of scripts in console. If program used to insert into SQL database, VALUES (?,?,?,?) would be used to avoid SQL injections
                console.log("")
                console.log("===================== INSERT INTO CONTACT TABLE =======================================")
                console.log("")
                console.log("INSERT INTO contact (Record_ID, Name, Cell_Phone, Work_Phone, Email, Address) VALUES")
                for (i = 0; i < user.length; i++) {
                    console.log("(" + user[i].Record_ID + ", `" + user[i].Name + "`, `" + user[i].Cell_Phone + "`, `" + user[i].Work_Phone + "`, `" + user[i].Email + "`, `" + user[i].Address + "`)");
                    if (i !== (user.length - 1)) {
                        console.log(",")
                    }
                }
                console.log("")
                console.log("===================== INSERT INTO WIDGET TABLE =======================================")
                console.log("")
                console.log("INSERT INTO widget (Record_ID, Basic_Widget_Order, Advanced_Widget_Order, Protection_Plan) VALUES")
                for (i = 0; i < user.length; i++) {
                    console.log(user[i].Record_ID + ", " + user[i].Basic_Widget_Order + ", " + user[i].Advanced_Widget_Order + ", " + user[i].Protection_Plan + ")");
                    if (i !== (user.length - 1)) {
                        console.log(",")
                    };
                }
            }
        });
    });


};