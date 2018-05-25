var mysql = require('mysql');

var pool = mysql.createPool({
    host: "18.219.147.253",
    user: "maestro",
    password: "themaster",
    database: "worldcuppool"
});

module.exports=pool;