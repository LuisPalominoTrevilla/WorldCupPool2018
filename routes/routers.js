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
  // Check if a session is already there, itś not the master account and it has the remember option checked
  if(req.session && !req.session.master && req.session.remember){
    // Send to the quiniela page
    res.redirect('/quiniela');
    return;
  }
  var msg = req.flash('msg');
  res.render('Start/login', {expressFlash: msg});
});

/* POST login */
router.post('/login', function(req, res, next) {
  var mysql = require('mysql');
  
  // Get POST parameters
  var username = req.body.username;
  var pswd = req.body.password;
  var remember_me;

  remember_me = (req.body.remember)? true: false;

  if (username != "" && pswd != ""){    // Check if username and password are not empty
    // Retrieve hashed password from database
    console.log(pool._allConnections.length);
    pool.getConnection(function(err, con) {
      console.log(pool._allConnections.length);
      sql = "SELECT user_id, password, code, event_name, background, start_date FROM user LEFT JOIN quiniela ON quiniela_id = code LEFT JOIN event ON event.event_id = quiniela.event_id WHERE username = " + mysql.escape(username);
      con.query(sql, function(err, result) {
        if(err) throw err;
        if(result.length > 0){    // Check if the result query had a field
          var hash = result[0].password;    // Get the password from the user
          // Get other information about the quiniela and event
          var user_id = result[0].user_id;
          var quiniela = result[0].code;
          var event = result[0].event_name;
          var background = result[0].background;
          var start_date = result[0].start_date;

          bcrypt.compare(pswd, hash, function(err, doesMatch){    // Compare password retrieved from db with provided password
            // The user was registered
            
            // If the master root account is trying to connect
            if(username === 'root' && doesMatch){
              req.session.regenerate(function(err){
                req.session.authenticated = true;
                req.session.username = username;
                req.session.master = true;
                res.redirect('/quiniela/master');
              });
              
            }else{
              if (doesMatch && quiniela != null){
                // Set up the session and send user to their dashboard
                req.session.regenerate(function(err){
                  req.session.authenticated = true;
                  req.session.username = username;
                  req.session.uid = user_id;
                  req.session.quiniela = quiniela;
                  req.session.event = event;
                  req.session.master = false;
                  req.session.background = background;
                  req.session.event_date = start_date;
                  req.session.remember = remember_me;
    
                  res.redirect('/quiniela');
                });
                
              }else{
                // Password was not correct
                req.flash('msg', 'Usuario o Contraseña incorrectos');
                res.redirect('/login');
              }
            }
           });
        }else{
          // There was no username registered
          req.flash('msg', 'Usuario o Contraseña incorrectos');
          res.redirect('/login');
        }
        con.release();
      });
    });
    
  }else{
    // Username or password were empty
    req.flash('msg', 'Por favor proporcione un usuario y contraseña');
    res.redirect('/login');
  }
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

/* GET create quiniela */
router.get('/cquiniela', function(req, res, next) {
  res.render('Start/quiniela.html');
});

/* POST create quiniela */
router.post('/cquiniela', function(req, res, next) {

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

module.exports = router;
