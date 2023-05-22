const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();
const inquirer = require('inquirer')
const cTable = require('console.table')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 
    database: 'employee_db'
  }
);
/*
Here are some hints about how to go about the multi-join query needed
in at least one part of the MySQL homework
Here’s a quick glance at how the tables reference each other:
employee      id       role_id     manager_id
role          id       dept_id
department    id
Here’s an incomplete join statement to get you started
SELECT ...
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN
LEFT JOIN employee manager ON xxxxxx.id = employee.xxxxxxx
*/


app.use((req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});