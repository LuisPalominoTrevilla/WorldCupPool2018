var express = require('express');
var router = express.Router();
var con = require('../database');
var randomstring = require("randomstring");
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Start/quiniela.html');
  //res.render('index', { title: 'Express' });
});

router.get('/crear', function(req, res, next) {
  
  // This must go on the post request
  con.query("SELECT code FROM quiniela", function(err, result) {
    if (err) throw err;
    var quiniela_codes = JSON.stringify(result);

    while(true){
      var new_code = randomstring.generate({
        length: 5,
        capitalization: 'uppercase'
      });
      console.log(new_code);
      var repeated = false;
      for(var code in quiniela_codes){
        if(new_code === quiniela_codes[code]){
          console.log('Repeated code');
          repeated = true;
          break;
        }
      }
      if(!repeated){
        // Insert to database
        break;
      }
    }
    
    res.send("Query completada");
  });
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
