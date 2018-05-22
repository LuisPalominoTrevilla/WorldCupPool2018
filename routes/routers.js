var express = require('express');
var router = express.Router();
var con = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {

  con.connect(function(err){
    if(err) throw err;
    console.log('connected');
    res.render('index', { title: 'Express' });
  });
});

module.exports = router;
