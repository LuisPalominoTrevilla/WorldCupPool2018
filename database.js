var mysql = require('mysql');

var con = mysql.createConnection({
    host: "18.219.147.253",
    user: "maestro",
    password: "themaster",
    database: "worldcuppool"
  });

  module.exports = con;
