var Todo = require("./../models/todo-model");

module.exports = (function() {

    var TodoController = {};

    /**
     * Create a new todo
     * @param  {string}   text     What needs doing
     * @param  {Function} callback Called on completion
     * @return {undefined}
     */
    TodoController.create = function(text, callback) {

        // Create new todo
        var todo = new Todo({text: text});

        // Persist
        todo.save(function(error, todo) {
            console.log(error, todo);
            callback(error, todo);
        });
    };

    return TodoController;
}());


// console.log(require("./app/controllers/todo-controller"))
// require("./app/controllers/todo-controller").create("something", function(a, b) {
//     console.log(a, b);
// })
