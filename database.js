var mysql = require('mysql');

var pool = mysql.createPool({
    host: "127.0.0.1",
    user: "maestro",
    password: "themaster",
    database: "worldcuppool",
    acquireTimeout: 4000,
    dateStrings: true,
    connectionLimit: 100
});

module.exports=pool;