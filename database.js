var mysql = require('mysql');

var con = mysql.createConnection({
    host: "206.189.168.11",
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
