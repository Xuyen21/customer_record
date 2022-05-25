// to connect with the created database, use third party package: node mysql2

const mysql = require('mysql2/promise');
// create connection
const pool = mysql.createPool({
    host: 'localhost',
    port: 13306,
    database: 'mydata',
    password: 'xuyen',
    user: 'xuyen',
    
});

module.exports = pool;