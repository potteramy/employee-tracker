
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

// async function getEmployeesByDept(){
//   // query for all the departments
//   const departments = await mysql.query("SELECT id AS key, name AS value FROM departments")

//   inquirer.prompt([



//     {
//       message: "Choose the department:",
//       type: "rawList",
//       choices: () => departments.map( item => ({ key: item.id, value: item.name }) )
//     }
//   ])
// }

let mainPrompts = [
  'View all departments',
  'View all roles',
  'View all employees',
  'Add a department',
  'Add a role',
  'Add an employee',
  'Update an employee role'
]

async function init() {
  mainPrompts = mainPrompts.map(prompt => {
    return { name: prompt, value: prompt }
  })
  await mainPrompt()
}


async function mainPrompt() {
  const choice = await inquirer.prompt([
    {
      message: "What would you like to do:",
      type: "list",
      name: "main",
      choices: mainPrompts
    }
  ])
  console.log(choice)
  if (choice.main === 'View all departments') {
    allDepartments()
  } else if(choice.main === 'View all roles') {
    allRoles()
  } else if (choice.main === 'View all employees'){
    allEmployees()
  } else if (choice.main === 'Add a department'){
    addDepartment()
  }else if (choice.main === 'Add a role'){
    addRole()
  }else if (choice.main === 'Add an employee'){
    addEmployee()
  }else if (choice.main === 'Update an employee role'){
    updateEmpRole()
  }
}

function allDepartments() {
  const sql = `SELECT * FROM departments`
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
    }
    const table = cTable.getTable(rows)
    console.log(table)
  })
}
function allRoles() {
  const sql = `SELECT * FROM roles`
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
    }
    const table = cTable.getTable(rows)
    console.log(table)
  })
}
function allEmployees(){
  const sql = `SELECT * FROM employee`
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
    }
    const table = cTable.getTable(rows)
    console.log(table)
  })
}
function addDepartment(){
  const sql = `INSERT INTO departments (department_name)
  VALUES(?)`
  inquirer.prompt([{
    type: 'input',
    message: 'What department would you like to add?',
    name: "department"
  }]).then((answers)=>{
    db.query(sql, answers.department, (err, rows) => {
      if (err) {
        console.log(err)
      }
      allDepartments()
    })
  })
}
function addRole(){

}
function addEmployee(){

}
function updateEmpRole(){

}
init()