var express = require('express');
var router = express.Router();
var pool = require('../database');

/* GET user dashboard page */
router.get('/', function(req, res, next) {
  res.render('Quiniela/dashboard', {username: req.session.username, background: req.session.background, event: req.session.event});
});

/* GET master account content */
router.get('/master', function(req, res, next) {
  res.send('Welcome Admin ' + req.session.username);
});
/* router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  if(req.session && req.session.id == id){
    res.send('El valor que mandaste es ' + id);
  }
  next();
}); */

module.exports = router;