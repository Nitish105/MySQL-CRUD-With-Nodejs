// step1: import mysql module in commonjs
const mysql = require('mysql2/promise');

// Step2: then, create connection to the database using mysql.createPool
const mySqlPool = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: 'Your_MYSQL_PASSWORD',
    database: 'student_db_crud_with_node'
})

module.exports = mySqlPool;