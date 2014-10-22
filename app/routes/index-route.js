
/* Dependencies
---------------------------------------------------------------------- */
var express     = require('express');
var router      = express.Router();


/* Routes
---------------------------------------------------------------------- */
router.get('/', function(req, res){
    res.render('index', {});
});


/* Return router
---------------------------------------------------------------------- */
module.exports = router;
