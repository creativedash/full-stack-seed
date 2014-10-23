var tester   = require("./../test_helper"),
    should   = require("should"),
    Todo     = require("./../../app/controllers/todo-controller");

describe("TodoController", function() {

    /**
     * Todo Creation
     * @return {undefined}
     */
    describe("#create", function() {

        // Allow for new todo creation
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


    /**
     * List Todos
     * @return {undefined}
     */
    describe("#list", function() {

        // Create 4 Sample todos
        beforeEach(function(done) {
            var items = ["Wash my car", "Feed the dogs", "Eat pizza", "Nap"];

            // Create a todo for each item
            items.forEach(function(item, index) {
                Todo.create(item, function(error, todo) {
                    if (index + 1 === items.length) {
                        done();
                    }
                });
            });
        });


        // Fetch list from DB
        it("should list todos", function(done) {
            Todo.list(null, null, function(error, todos) {

                // No errors returned
                should.not.exist(error);

                // Should send back an array
                (typeof todos === "object").should.be.true;

                // Should get 4 back
                (todos.length === 4).should.be.true;

                // All clear
                done();
            });

        });


        // Test limit
        it("should allow paged results", function(done) {

            // Page 2, 2 per page
            Todo.list(2, 2, function(error, todos) {
                (todos.length === 2).should.be.true;
            });

            // Page 1, 3 per page
            Todo.list(1, 3, function(error, todos) {
                (todos.length === 3).should.be.true;
            });

            // Single todo
            Todo.list(1, 1, function(error, todos) {
               (todos.length === 1).should.be.true; 
           });

            // Done
            done();
        });


    });

});
