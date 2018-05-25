var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");
var bcrypt = require('bcrypt');
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome');
  //res.render('index', { title: 'Express' });
});

/* GET login */
router.get('/login', function(req, res, next) {
  res.send('Aqui se inicia sesión');
});

/* GET register */
router.get('/register', function(req, res, next) {
  res.render('Start/register.html');
});

/* GET quiniela */
router.get('/quiniela', function(req, res, next) {
  res.render('Start/quiniela.html');
});

/* POST quiniela */
router.post('/quiniela', function(req, res, next) {
  
  // Database connection
  var con = mysql.createConnection({
    host: "18.219.147.253",
    user: "maestro",
    password: "themaster",
    database: "worldcuppool"
  });

  // Get post parameters
  var ev_id = parseInt(req.body.event);
  var cost = parseInt(req.body.monto);

  con.query("SELECT code FROM quiniela", function(err, result) {
    if (err) throw err;
    var quiniela_codes = result;

    while(true){
      var new_code = randomstring.generate({
        length: 5,
        capitalization: 'uppercase'
      });
      var repeated = false;
      for(var i = 0; i < quiniela_codes.length; i++){
        if(new_code === quiniela_codes[i].code){
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
          var success_page = '/success?code='+new_code;

          // Redirect to avoid POST problems
          res.redirect(success_page);
        });
        break;
      }
    }
  });
});

/* GET success page */
router.get('/success', function(req, res, next) {
  var new_code = req.query.code;
  res.render('Start/success', {code: new_code});
});

/* router.get('/login', function(req, res, next) {
  bcrypt.hash('themaster', 11, function( err, bcryptedPassword) {
    bcrypt.compare('themaster', bcryptedPassword, function(err, doesMatch){
      if (doesMatch){
         res.send(' Si es');
      }else{
         res.send('No es');
      }
     });
 });
}); */

module.exports = router;
