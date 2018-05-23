var express = require('express');
var router = express.Router();
var con = require('../database');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {

  con.query("SELECT * FROM groups", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });

  /* con.connect(function(err){
    if(err) throw err;
    console.log('connected');

    
    //res.render('index', { title: 'Express' });
  }); */
});

router.get('/login', function(req, res, next) {
  bcrypt.hash('themaster', 11, function( err, bcryptedPassword) {
    bcrypt.compare('themaster', bcryptedPassword, function(err, doesMatch){
      if (doesMatch){
         res.send(' Si es');
      }else{
         res.send('No es');
      }
     });
 });

 
  
});

module.exports = router;
