
/* Template Settings (Jade)
---------------------------------------------------------------------- */
module.exports = function(app){
    app.set('views', app.get('path') + '/app/views');
    app.set('view engine', 'jade');
    app.locals.pretty = true;
};
