var tester   = require("./../test_helper"),
    should   = require("should"),
    Todo     = require("./../../app/models/todo-model");

describe("TodoModel", function() {

    // Saving New Models
    describe("#save", function() {

        // Don't allow empty tasks
        it("should not allow blank tasks", function(done) {

            // Stubb Todo
            var todo = new Todo();

            // Attempt Save
            todo.save(function(error, todo) {

                // Ensure Todo Doesn't exist
                should.not.exist(todo);

                done();
            });
        });

    });


});
