var mysql = require('mysql');

var pool = mysql.createPool({
    host: "18.219.147.253",
    user: "maestro",
    password: "themaster",
    database: "worldcuppool",
    acquireTimeout: 1000,
    dateStrings: true
});

module.exports=pool;