
/* Dependencies
---------------------------------------------------------------------- */
var express     = require('express');
var bodyParser  = require('body-parser');
var port        = process.env.PORT || 3000;


/* Express
---------------------------------------------------------------------- */
var app = express();
app.set('path', __dirname);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* Config
---------------------------------------------------------------------- */
require('./config/templates')(app); // Template rendering settings


/* Routes
---------------------------------------------------------------------- */
app.use('/', require('./app/routes/index-route'));


/* Start Server
---------------------------------------------------------------------- */
app.listen(port);
console.log('Express is running on port ' + port);


/* Return Express
---------------------------------------------------------------------- */
module.exports = app;
