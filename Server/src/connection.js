const mysql = require('mysql2');
const { DATABASE } = require('./config/config');
 
const pool = mysql.createPool({
    host: DATABASE.HOST,
    user: DATABASE.USER,
    password: DATABASE.PASSWORD,
    database: DATABASE.NAME,
    port: DATABASE.PORT,
    connectionLimit: 10,
  });
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.message);
    } else {
      console.log('Connected to MySQL!!!!!');
      connection.release();
    }
  });
  
  pool.on('error', (err) => {
    console.error('MySQL Pool Error:', err.message);
  }); 
  
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
    } else {
      console.log('Database Connected Successfully');
    }
  });

  module.exports = pool 