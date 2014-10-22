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
        todo.save(function(error, todo, affected) {

            // Error Persisting
            if (error) {
                return callback("Unable to create todo");
            }

            return callback(null, todo);
        });
    };


    return TodoController;
}());
