
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');


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
    mainPrompt()
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
    mainPrompt()
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
    mainPrompt()
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
      mainPrompt()
    })
  })
}
function addRole(){
  const sql = `INSERT INTO roles (title, salary)
  VALUES(?,?)`
  inquirer.prompt([{
    type: 'input',
    message: 'What role would you like to add?',
    name: "title"
  },
  {
    type: 'input',
    message: 'What is the salary for this role?',
    name: "salary"
  },
  {
    type: 'input',
    message: 'What is the department ID for this role?',
    name: "department_id"
  }
]).then(({title, salary, department_id})=>{
    db.query(sql, [title, salary, department_id], (err, rows) => {
      if (err) {
        console.log(err)
      }
      mainPrompt()
    })
  })
}
function addEmployee(){
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES(?,?,?,?)`;
  inquirer.prompt([{
    type: 'input',
    message: 'Employee first name:',
    name: "first_name"
  },
  {
    type: 'input',
    message: 'Employee last name:',
    name: 'last_name'
  },
  {
    type: 'input',
    message: 'Enter a role id',
    name: 'role_id'
  },
  {
    type: 'input',
    message: 'Enter a manager id',
    name: 'manager_id'
  }
  ]).then(({ first_name, last_name, role_id, manager_id })=>{
    db.query(sql,[first_name, last_name, role_id, manager_id ], (err, rows) => {
      if (err) {
        console.log(err)
      }
      mainPrompt()
    })
  })
}
function updateEmpRole(){
  const sql = `UPDATE employee
  SET role_id = ?
  WHERE id = ?`;

  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the employee ID:',
      name: 'id'
    },
    {
      type: 'input',
      message: 'Enter the new role ID:',
      name: 'role_id'
    }
  ]).then(({id, role_id})=> {
    db.query(sql, [role_id, id], (err, rows) => {
      if (err) {
        console.log(err);
      }
      mainPrompt()
    })
  })
}
init()