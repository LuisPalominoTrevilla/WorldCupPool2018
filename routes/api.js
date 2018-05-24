var express = require('express');
var con = require('../database');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('API is alive');
  
});

/* GET THE events */


/* GET THE TEAMS */
router.get('/gTEAMS', function(req, res, next) {
  console.log('Request to the unknown');
  if(req.session && req.session.authenticated){
    res.send('respond with a resource');
  }else{
    req.session.authenticated=true;
    res.redirect('/login');
  }
});

module.exports = router;
