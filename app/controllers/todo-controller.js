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


    /**
     * Get a single todo
     * @param  {string}   id       Todo to fetch
     * @param  {Function} callback Called on completion
     * @return {undefined}
     */
    TodoController.get = function(id, callback) {

        // Validate MongoId
        if (!id.length || id.length < 24) {
            return callback("Invalid todo id");
        }

        // Fetch single todo
        Todo.findById(id, function(error, todo) {
            if (error) {
                return callback(error);
            }

            // Go!
            return callback(null, todo);
        });
    };


    /**
     * Get a list of todos
     * @param  {int} page  Paginated offset
     * @param  {int} count Number of results per page
     * @param  {Function} callback Called on completion
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
                    return callback(error);
                }

                return callback(null, todos);
            });
    };


    /**
     * Delete a todo by id
     * @param  {string} id Todo to delete
     * @param  {Function} callback Called on completion
     * @return {undefined}
     */
    TodoController.delete = function(id, callback) {

        // Validate MongoId
        if (!id.length || id.length < 24) {
            return callback("Invalid todo id");
        }

        // Remove todo
        Todo.findOneAndRemove({_id: id}, function(error) {
            if (error) {
                return callback(error);
            }

            // No errors
            return callback(null);
        });
    };


    return TodoController;
}());
