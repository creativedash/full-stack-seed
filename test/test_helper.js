(function() {

    // Depends on Mongoose
    var mongoose = require("mongoose"),
        Todo     = require("./../app/models/todo-model");

    // Connect To Test DB
    mongoose.connect("mongodb://localhost/todo_app_test");

    // After each test completes
    afterEach(function() {

        // Clean out todos
        Todo.remove({}, function() {});
    });

    // After all tests complete
    after(function() {
        // Close Mongo Connection
        mongoose.connection.close();
    })

}());
