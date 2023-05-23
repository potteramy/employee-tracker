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
app.use(cTable);

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 
    database: 'employee_db'
  }
);



app.use((req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function getEmployeesByDept(){
  // query for all the departments
  const departments = await mysql.query("SELECT id AS key, name AS value FROM departments")

  inquirer.prompt([
    {
      message: "Choose the department:",
      type: "rawList",
      choices: function(){
        return departments.map( item => {
          return {
            key: item.id,
            value: item.name
          }
        } )
      }
    }

    {
      message: "Choose the department:",
      type: "rawList",
      choices: function(){
        return departments.map( item => ({ key: item.id, value: item.name }) )
      }
    }


    {
      message: "Choose the department:",
      type: "rawList",
      choices: () => departments.map( item => ({ key: item.id, value: item.name }) )
    }
  ])
}