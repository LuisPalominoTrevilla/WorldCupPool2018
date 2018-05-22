var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "maestro",
    password: "themaster"
  });

  module.exports = con;