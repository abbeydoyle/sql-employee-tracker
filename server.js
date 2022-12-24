// requirements
const express = require(`express`);
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const fs = require("fs");
require("dotenv").config();

// strings containing sql queries to be called on
// suggested to keep separate files for view function queries
const queryDepartments = fs.readFileSync("db/queryDepartments.sql").toString();
const queryRoles = fs.readFileSync("db/queryRoles.sql").toString();
const queryEmployees = fs.readFileSync("db/queryEmployees.sql").toString();

// declare port
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
      {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: process.env.password,
        database: 'employee_db'
      },
      console.log(`Connected to the employee_db database.`)
    );

    db.connect(err => {
      if (err) throw err;
      console.log(`Database connection successful via id` + db.threadID);
      initialQuestion();
});

// empty arrays for responsive inquirer list choices
let roles = [];



// opening question
const initialQuestion = () => {
      inquirer.prompt ([
            {
                  type: `list`,
                  name: `purpose`,
                  message: `What would you like to do?`,
                  options: [`View all employees`, `Add employee`, `Update employee role`, `View all roles`, `Add role`, `View all departments`, 'Add department', `Exit application`]
            }
      ])
      .then(function(response) {
            switch (response.purpose) {
                  case "View all employees": viewEmployees();
                  break;
                  case "Add employee": addEmployees();
                  break;
                  case "Update employee role": updateEmployeeRole();
                  break;
                  case "View all roles": viewRoles();
                  break;
                  case "Add role": addRole();
                  break;
                  case "View all departments": viewDepartments();
                  break;
                  case "Add department": addDepartment();
                  break;
                  // TODO: write app function
                  default: db.end;
                  console.log(`Thank you for visiting!`);
                  break;
            }
      });

      // used for responsive role list in add function inquirer prompt
      db.query(`SELECT role.title AS title FROM role;`, (err, result) => {
            if (err) throw err;
            let roles = result.map(function(obj) {
                  return obj.title;
                });
      })

      // used for responsive manager list in add function inquirer prompt
      db.query(`SELECT CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id WHERE manager.id > 0 GROUP BY manager.first_name, manager.last_name;`, (err, result) => {
            if (err) throw err;
            let managers = result.map(function(obj) {
                  return obj.manager
            })
      })
};

viewEmployees = () => {
      db.query(`${queryEmployees}`, (err, result) => {
            if (err) throw err;
            console.table(result);
            initialQuestion();
      })
};

viewRoles = () => {
      db.query(`${queryRoles}`, (err, result) => {
            if (err) throw err;
            console.table(result);
            initialQuestion();
      })
};

viewDepartments = () => {
      db.query(`${queryDepartments}`, (err, result) => {
            if (err) throw err;
            console.table(result);
            initialQuestion();
      })
};

addEmployees = () => {
      inquirer.prompt ([
            {
                  type: `input`,
                  name: `employeeFirst`,
                  message: `What's the first name of this employee?`,
                  validate: employeeFirstInput => {
                        if (employeeFirstInput) {
                              return true;
                        } else {
                              console.log(`Please enter your employee's  first name`);
                              return false;
                        }
                  }
            },

            {
                  type: `input`,
                  name: `employeeLast`,
                  message: `What's the last name of this employee?`,
                  validate: employeeLastInput => {
                        if (employeeLastInput) {
                              return true;
                        } else {
                              console.log(`Please enter your employee's  last name`);
                              return false;
                        }
                  }
            },

            {
                  type: `input`,
                  name: `employeeRole`,
                  message: `What's this employee's role?`,
                  validate: employeeRoleInput => {
                        if (employeeRoleInput) {
                              return true;
                        } else {
                              console.log(`Please enter your employee's  role`);
                              return false;
                        }
                  }
            },

            {
                  type: `input`,
                  name: `employeeManager`,
                  message: `Who is the manager of this employee?`,
                  validate: employeeManagerInput => {
                        if (employeeManagerInput) {
                              return true;
                        } else {
                              console.log(`Please enter your employee's  manager`);
                              return false;
                        }
                  }
            }
      ])
      .then((answers) => {
            db.query(``)

      })
}