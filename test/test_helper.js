(function() {

    // Depends on Mongoose
    var mongoose = require("mongoose");

    // Connect To Test DB
    mongoose.connect("mongodb://localhost/todo_app_test");

    // After all tests complete
    after(function() {
        // console.log("Cleanup DB now..");

        // Close Mongo Connection
        mongoose.connection.close();
    });

}());
