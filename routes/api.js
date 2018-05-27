var express = require('express');
var router = express.Router();
var pool = require('../database');

/* GET API is alive */
router.get('/', function(req, res, next) {
  res.send('API is alive');
  
});

/* GET THE events */
router.get('/events', function(req, res, next){
  console.log(pool._allConnections.length);
  pool.getConnection(function(err, con) {
    con.query("SELECT event_name, event_id FROM event", function (err, result) {
      console.log(pool._allConnections.length);
      con.release();
      if (err) throw err;
      res.json(result);
    });
  });
});

/* GET users */
router.get('/users', function(req, res, next) {
  pool.getConnection(function(err, con) {
    con.query("SELECT username FROM user", function(err, result) {
      con.release();
      if (err) throw err;
      res.json(result);
    });
  });
  
});

/* GET quinielas */
router.get('/quinielas', function(req, res, next) {
  pool.getConnection(function(err, con) {
    if(err) throw err;
    con.query("SELECT code FROM quiniela", function(err, result) {
      con.release();
      if (err) throw err;
      res.json(result);
    });
  });
});

/* GET groups stats */
router.get('/groups', function(req, res, next) {
  pool.getConnection(function(err, con) {
    if(err) throw err;
    var sql = `SELECT name, flag, group_name, played, won, lost, tied, IF(goals_favor>=0, goals_favor, 0) goals_favor, IF(goals_against>=0, goals_against, 0) goals_against, IFNULL(goals_favor - goals_against, 0) goal_difference, (won*3 + tied) AS points FROM(
      SELECT t.name, t.flag, g.group_name, sum(m.match_status) played,
      SUM((
        CASE
            WHEN m.result_id = 1 && m.home_team = t.code THEN 1
            WHEN m.result_id = 2 && m.away_team = t.code THEN 1
            ELSE 0
      END)) AS won,
        SUM((
        CASE
            WHEN m.result_id = 1 && m.away_team = t.code THEN 1
            WHEN m.result_id = 2 && m.home_team = t.code THEN 1
            ELSE 0
      END)) AS lost,
        SUM((
        CASE
            WHEN m.result_id = 0 THEN 1
            ELSE 0
      END)) AS tied,
        SUM((
        CASE
            WHEN m.home_team = t.code THEN m.local_goals
            WHEN m.away_team = t.code THEN m.away_goals
      END)) AS goals_favor,
        SUM((
        CASE
            WHEN m.home_team = t.code THEN m.away_goals
            WHEN m.away_team = t.code THEN m.local_goals
      END)) AS goals_against
      FROM groups g JOIN team t ON t.belonging_group = g.group_id JOIN matches m ON t.code = m.home_team OR t.code = m.away_team WHERE m.match_type = 1 GROUP BY t.name, t.flag, g.group_name) t ORDER BY group_name, points DESC, goal_difference DESC, goals_favor DESC`;
    con.query(sql, function(err, result) {
      con.release();
      if(err) throw err;
      res.json(result);
    });
  });
});

/* GET user matches with bets */
router.get('/matches/:mt', function(req, res, next) {
  var mysql = require('mysql');
  // Handle unauthorized access
  if(!req.session || !req.session.authenticated || req.session.master){
    res.status(403);
    req.flash('msg', 'Por favor inicia sesión antes de continuar');
    res.redirect('/login');
    return;
  }
  var match_type = req.params.mt;
  pool.getConnection(function(err, con) {
    if(err) throw err;
    sql = `SELECT h.name AS home, a.name AS away, IFNULL(m.local_goals, 0) AS goals_home, IFNULL(m.away_goals, 0) AS goals_away, 
            m.match_date AS date_match, m.result_id AS result, m.match_status, b.predicted_result, b.points FROM matches m 
            JOIN team h ON m.home_team = h.code JOIN team a ON m.away_team = a.code LEFT JOIN 
            (SELECT bet.respective_match, bet.predicted_result, IFNULL(bet.points, 0) points FROM bet WHERE bet.user= ` + mysql.escape(req.session.uid) + ` ) b 
            ON m.match_id = b.respective_match WHERE m.match_type=`+ mysql.escape(match_type) +` ORDER BY m.match_date;`
    con.query(sql, function(err, result) {
      con.release();
      if(err) throw err;
      res.json(result);
    });
  });
  
});

module.exports = router;
