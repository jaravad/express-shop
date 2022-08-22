const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-shop',
  password: 'T0mmyShelby',
});

module.exports = pool.promise();
