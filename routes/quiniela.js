var express = require('express');
var router = express.Router();
var pool = require('../database');

/* GET user dashboard page */
router.get('/', function(req, res, next) {
    console.log(req.session.event_date);
    res.send('Bienvenido ' + req.session.username + " quiniela: " + req.session.quiniela + ' evento: ' + req.session.event + ' bk: ' + req.session.background + ' on ' + req.session.event_date);
});

/* router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  if(req.session && req.session.id == id){
    res.send('El valor que mandaste es ' + id);
  }
  next();
}); */

module.exports = router;