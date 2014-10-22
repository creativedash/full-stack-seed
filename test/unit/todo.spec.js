var should = require("should"),
    Todo   = function() {}; // Stubbed for now

describe("TodoController", function() {

    // Create New Todos
    describe("#create", function() {

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


    // Add New Todos
    // it("Should add new todos", function(done) {

    // });

});
