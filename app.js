
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


// Routes
app.use("/", require("./app/routes/index-route"));


// Start Server
app.listen(port);
console.log("Express is running on port " + port);
