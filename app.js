
// Module Dependencies
var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require("mongoose"),
    favicon     = require('serve-favicon'),
    port        = process.env.PORT || 3000;


// Express
var app = express();
app.set("path", __dirname);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/client/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));


// Export Express
module.exports = app;


// Database Connection
mongoose.connect('mongodb://localhost/todo_app');


// Config
require("./config/templates"); // Template rendering settings
var td = require("./app/controllers/todo-controller");

// Routes
app.use("/", require("./app/routes/index-route"));

app.get("/todos", function(req, res, next) {
    td.list(1, 30, function(error, todos) {
        return res.json(todos);
    })
});

app.get("/todos/delete/:id", function(req, res, next) {
    td.delete(req.params.id, function(error) {
        if (error) {
            return res.json({message: "There was an error"})
        }

        return res.redirect("/todos");
    });
});

app.get("/todos/update/:id", function(req, res, next) {
    td.update(req.params.id, req.query.text, function(error, todo) {
        return res.json(todo);
    })
});



app.get("/todos/:text", function(req, res, next) {
    td.create(req.params.text, function(error, todo) {
        return res.json(todo);
    });
});




// Start Server
app.listen(port);
console.log("Express is running on port " + port);
