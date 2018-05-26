var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");
var bcrypt = require('bcrypt');
var pool = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

/* GET login */
router.get('/login', function(req, res, next) {
  res.send('Aqui se inicia sesión');
});

/* GET register */
router.get('/register', function(req, res, next) {
  res.render('Start/register.html');
});

/* POST register */
router.post('/register', function(req, res, next) {

  // Get POST parameters
  var username = req.body.username;
  var pswd = req.body.password;
  var quiniela = req.body.quiniela;

  bcrypt.hash(pswd, 11, function( err, bcryptedPassword) {
    if (err) throw err;
    pool.getConnection(function(err, con) {
      var sql = "INSERT INTO user (user_type, username, password, quiniela_id) VALUES ?";
      var VALUES=[
        [2, username, bcryptedPassword, quiniela]
      ];
      con.query(sql, [VALUES], function(err, result) {
        if(err){
          res.redirect('/register');
        }else{
          // Redirect to avoid POST problems
          res.redirect('/login');
        }
        con.release();
      });
    });
  });

});

/* GET quiniela */
router.get('/quiniela', function(req, res, next) {
  res.render('Start/quiniela.html');
});

/* POST quiniela */
router.post('/quiniela', function(req, res, next) {

  // Get POST parameters
  var ev_id = parseInt(req.body.event);
  var cost = parseInt(req.body.monto);

  pool.getConnection(function(err, con) {
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
          console.log(quiniela_codes[i].code);
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
            con.release();
          });
          break;
        }
      }
    });
  });
});

/* GET success page */
router.get('/success', function(req, res, next) {
  var new_code = req.query.code;
  res.render('Start/success', {code: new_code});
});

/* router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  if(req.session && req.session.id == id){
    res.send('El valor que mandaste es ' + id);
  }
  next();
}); */

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
