var tester   = require("./../test_helper"),
    should   = require("should"),
    Todo     = require("./../../app/controllers/todo-controller");

describe("TodoController", function() {

    // Create New Todos
    describe("#create", function() {

        // Create New Todos
        it("should add new todos", function(done) {
            Todo.create("My example todo", function(error, todo) {
                // No Errors Should Exist
                should.not.exist(error);

                // Expect the todo to have a created date
                todo.should.have.property("created");

                // Spec Complete
                done();
            });
        });
    });

});
