const mysql = require('mysql2');
require('dotenv').config()
const password = process.env.PASSWORD



const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'employee_db'
  }
);
db.connect(function (err) {
  if (err) throw err;
});

module.exports = db