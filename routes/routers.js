var express = require('express');
var router = express.Router();
var con = require('../database');
var randomstring = require("randomstring");
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome');
  //res.render('index', { title: 'Express' });
});

router.get('/quiniela', function(req, res, next) {
  res.render('Start/quiniela.html');
});

router.post('/quiniela', function(req, res, next) {
  var ev_id = parseInt(req.body.event);
  var cost = parseInt(req.body.monto);
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
        var sql = "INSERT INTO quiniela (code, name, event_id, bet) VALUES ?";
        var values = [[new_code, 'Quiniela', ev_id, cost]];
        con.query(sql, [values], function(err, result) {
          if (err) throw err;
          // Render page
          res.send(new_code);
          //res.render('Start/success', {code: new_code});
        });
        break;
      }
    }
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
