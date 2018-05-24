var mysql = require('mysql');

var con = mysql.createConnection({
    host: "18.219.147.253",
    user: "maestro",
    password: "themaster",
    database: "worldcuppool"
  });

  con.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");    
    } else {
        console.log("Error connecting database ... nn");    
    }
    });
  module.exports = con;
