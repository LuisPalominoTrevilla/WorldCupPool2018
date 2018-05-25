var express = require('express');
var con = require('../database');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('API is alive');
  
});

/* GET THE events */
router.get('/events', function(req, res, next){
  con.query("SELECT event_name, event_id FROM event", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});

/* GET THE TEAMS */
/* router.get('/gTEAMS', function(req, res, next) {
  console.log('Request to the unknown');
  if(req.session && req.session.authenticated){
    res.send('respond with a resource');
  }else{
    req.session.authenticated=true;
    res.redirect('/login');
  }
}); */

module.exports = router;
