var express = require('express');
var router = express.Router();
var pool = require('../database');
var mysql = require('mysql');

/* GET user dashboard page */
router.get('/', function(req, res, next) {
  // Handle unauthorized access
  if(!req.session || !req.session.authenticated || req.session.master){
    res.status(403);
    req.flash('msg', 'Por favor inicia sesión antes de continuar');
    res.redirect('/login');
    return;
  }
  // Get participants
  pool.getConnection(function(err, con) {
    console.log(pool._allConnections.length);
    if(err) throw err;
    sql = "SELECT username FROM user u JOIN quiniela q ON u.quiniela_id = q.code WHERE q.code = " + mysql.escape(req.session.quiniela) +  " AND username != " + mysql.escape(req.session.username);
    con.query(sql, function(err, result) {
      sql = "SELECT IFNULL(SUM(b.points), 0) AS points FROM user u LEFT JOIN bet b ON u.user_id = b.user WHERE u.user_id=" + mysql.escape(req.session.uid);
      con.query(sql, function(err, points) {
        con.release();
        res.render('Quiniela/dashboard', {username: req.session.username, background: req.session.background, event: req.session.event, competitors: result, points: points[0].points});
        if(err) throw err;
      });
    });
  });
});

/* GET user dashboard knockout page */
router.get('/knockout', function(req, res, next) {
  // Handle unauthorized access
  if(!req.session || !req.session.authenticated || req.session.master){
    res.status(403);
    req.flash('msg', 'Por favor inicia sesión antes de continuar');
    res.redirect('/login');
    return;
  }
  // Get participants
  pool.getConnection(function(err, con) {
    console.log(pool._allConnections.length);
    if(err) throw err;
    sql = "SELECT username FROM user u JOIN quiniela q ON u.quiniela_id = q.code WHERE q.code = " + mysql.escape(req.session.quiniela) +  " AND username != " + mysql.escape(req.session.username);
    con.query(sql, function(err, result) {
      sql = "SELECT IFNULL(SUM(b.points), 0) AS points FROM user u LEFT JOIN bet b ON u.user_id = b.user WHERE u.user_id=" + mysql.escape(req.session.uid);
      con.query(sql, function(err, points) {
        con.release();
        res.render('Quiniela/knockout', {username: req.session.username, background: req.session.background, event: req.session.event, competitors: result, points: points[0].points});
        if(err) throw err;
      });
      
    });
  });
});

/* GET user dashboard groups page */
router.get('/groups', function(req, res, next) {
  // Handle unauthorized access
  if(!req.session || !req.session.authenticated || req.session.master){
    res.status(403);
    req.flash('msg', 'Por favor inicia sesión antes de continuar');
    res.redirect('/login');
    return;
  }
  // Get participants
  pool.getConnection(function(err, con) {
    console.log(pool._allConnections.length);
    if(err) throw err;
    sql = "SELECT username FROM user u JOIN quiniela q ON u.quiniela_id = q.code WHERE q.code = " + mysql.escape(req.session.quiniela) +  " AND username != " + mysql.escape(req.session.username);
    con.query(sql, function(err, result) {
      sql = "SELECT IFNULL(SUM(b.points), 0) AS points FROM user u LEFT JOIN bet b ON u.user_id = b.user WHERE u.user_id=" + mysql.escape(req.session.uid);
      con.query(sql, function(err, points) {
        con.release();
        res.render('Quiniela/groups', {username: req.session.username, background: req.session.background, event: req.session.event, competitors: result, points: points[0].points});
        if(err) throw err;
      });
      
    });
  });
});

/* GET quiniela from other participants */
router.get('/users/:uname', function(req, res, next) {
  // Handle unauthorized access
  if(!req.session || !req.session.authenticated || req.session.master){
    res.status(403);
    req.flash('msg', 'Por favor inicia sesión antes de continuar');
    res.redirect('/login');
    return;
  }
  // Get participant
  var participant_name = req.params.uname;
  pool.getConnection(function(err, con) {
    console.log(pool._allConnections.length);
    if(err) throw err;
    sql = "SELECT user_id FROM user WHERE username = " + mysql.escape(participant_name);
    con.query(sql, function(err, result) {
      con.release();
      if(result.length > 0){
        res.render('Quiniela/participant', {background: req.session.background, username: participant_name, uid: result[0].user_id});
      }else{
        res.redirect('/notfound');
      }
      if(err) throw err;
    });
  });
});

/* GET master account content */
router.get('/master', function(req, res, next) {
  // Handle unauthorized access
  if(!req.session || !req.session.authenticated || !req.session.master){
    res.status(403);
    req.flash('msg', 'Por favor inicia sesión antes de continuar');
    res.redirect('/login');
    return;
  }
  res.send('Welcome Admin ' + req.session.username);
});

/* GET LOGOUT */
router.get('/logout', function(req, res, next) {
  // Handle unauthorized access
  if(!req.session || !req.session.authenticated){
    res.status(403);
    req.flash('msg', 'Por favor inicia sesión antes de continuar');
    res.redirect('/login');
    return;
  }
  req.session.destroy();
  res.redirect('/login');
});

/* router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  if(req.session && req.session.id == id){
    res.send('El valor que mandaste es ' + id);
  }
  next();
}); */

module.exports = router;