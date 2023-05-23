const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('./db/connection');
app.use(cTable);

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