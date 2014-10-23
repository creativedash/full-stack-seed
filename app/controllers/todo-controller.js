var Todo = require("./../models/todo-model");

module.exports = (function() {

    var TodoController = {};

    /**
     * Get a list of todos
     * @param  {int} page  Paginated offset
     * @param  {int} count Number of results per page
     * @return {undefined}
     */
    TodoController.list = function(page, count, callback) {

        var skip;

        // Defaults
        page  = page || 1;
        count = count || 20;

        // How many results to skip
        skip = (page > 1)? (page - 1) * count : 0;

        // Fetch Todos
        Todo
            .find({})
            .limit(count)
            .sort({_id: -1})
            .skip(skip)
            .exec(function(error, todos) {

                if (error) {
                    return callback("Unable to list todos");
                }

                return callback(null, todos);
            });
    };


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
