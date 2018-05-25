var express = require('express');
var router = express.Router();
var pool = require('../database');

/* GET API is alive */
router.get('/', function(req, res, next) {
  res.send('API is alive');
  
});

/* GET THE events */
router.get('/events', function(req, res, next){
  pool.getConnection(function(err, con) {
    con.query("SELECT event_name, event_id FROM event", function (err, result) {
      if (err) throw err;
      res.json(result);
      con.release();
    });
  });
});

/* GET users */
router.get('/users', function(req, res, next) {
  pool.getConnection(function(err, con) {
    con.query("SELECT username FROM user", function(err, result) {
      if (err) throw err;
      res.json(result);
      con.release();
    });
  });
  
});

/* GET quinielas */
router.get('/quinielas', function(req, res, next) {
  pool.getConnection(function(err, con) {
    con.query("SELECT code FROM quiniela", function(err, result) {
      if (err) throw err;
      res.json(result);
      con.release();
    });
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
