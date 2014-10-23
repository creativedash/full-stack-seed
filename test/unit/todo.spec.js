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


    /**
     * Delete Todos
     * @return {undefined}
     */
    describe("#delete", function() {
        var todos = [];

        // Create 4 Sample todos
        beforeEach(function(done) {
            var items = ["Wash my car", "Feed the dogs", "Eat pizza", "Nap"];

            // Create a todo for each item
            items.forEach(function(item, index) {
                Todo.create(item, function(error, todo) {
                    todos.push(todo._id);

                    if (index + 1 === items.length) {
                        done();
                    }
                });
            });
        });

        it("should delete todos", function(done) {

            // Delete the first todo
            Todo.delete(String(todos[0]), function(error) {

                // No errors :)
                should.not.exist(error);

                // Verify that our database has actually deleted the todo
                // NOTE: should this test go to the model?
                Todo.list(null, null, function(error, todos) {

                    // No errors!
                    should.not.exist(error);

                    // 4 (todos) - 1 = 3
                    (todos.length).should.be.exactly(3);

                    done();
                });

            });

        });

        it("should not allow invalid mongoids", function(done) {
            Todo.delete("faoisdasd", function(error) {
                should.exist(error);
                done();
            });
        });
    });


    /**
     * Get a single todo
     * @return {undefined}
     */
    describe("#get", function() {

        var id = "";

        // Create a todo
        before(function(done) {
            Todo.create("This is a really rad todo!!!", function(error, todo) {
                id = String(todo._id);
                done();
            });
        });

        it("should get single todos", function(done) {

            // Get a todo
            Todo.get(id, function(error, todo) {

                // No errors allowed
                should.not.exist(error);

                // Should get an object back
                (typeof todo === "object").should.be.true;

                // Ensure created date
                todo.should.have.property("created");

                done();
            });
        });

    });


    /**
     * Update an existing 
     * @return {[type]} [description]
     */
    describe("#update", function() {

        var id = "";

        before(function(done) {
            Todo.create("A todo that I'm going to update in a few ms", function(error, todo) {
                id += todo._id;
                done();
            });
        });

        it("Should update todo text", function(done) {
            Todo.update(id, "the updated value", function(error, todo) {

                // No errors
                should.not.exist(error);

                // We should get an object back
                todo.should.be.an.Object;

                // We should see the updated state
                todo.should.have.property("updated");

                done();
            });
        });
    });

});
