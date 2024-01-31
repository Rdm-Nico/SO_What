require('dotenv').config();
var mysql = require('mysql2')

var pool = mysql.createPool({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : proces.env.DATABASE_NAME,
    connectionLimit : 15,
    enableKeepAlive: true
});

exports.pool = pool;