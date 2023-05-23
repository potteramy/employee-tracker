const mysql = require('mysql2');
const password = process.env.PASSWORD



const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'employee_db'
  }
);
module.exports=db.connection;