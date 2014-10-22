
// Require Express
var app = require('../app');


// Template Settings (Jade)
app.set('views', app.get('path') + '/app/views');
app.set('view engine', 'jade');
app.locals.pretty = true; // Minify HTML
