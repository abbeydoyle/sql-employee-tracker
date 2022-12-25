// requirements
const express = require(`express`);
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const fs = require("fs");
const chalk = require('chalk')
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
      console.log(chalk.bgHex('#526b48').white('\n Connected to the employee_db database \n'))
    );

    db.connect(err => {
      if (err) throw err;
      // console.log(`Database connection successful via id` + db.threadID);
      initialQuestion();
});

// opening question
const initialQuestion = () => {
      inquirer.prompt ([
            {
                  type: `list`,
                  name: `purpose`,
                  message: `What would you like to do?`,
                  choices: [`View all employees`, `Add employee`, `Update employee role`, `View all roles`, `Add role`, `View all departments`, 'Add department', `Exit application`]
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
                  exit();
                  break;
            }
      });
};

viewEmployees = () => {
      db.query(`${queryEmployees}`, (err, result) => {
            if (err) throw err;
            console.log(chalk.bgHex('#526b48').white('\n Viewing all employees: \n'))
            console.table(result);
            initialQuestion();
      })
};

viewRoles = () => {
      db.query(`${queryRoles}`, (err, result) => {
            if (err) throw err;
            console.log(chalk.bgHex('#526b48').white('\n Viewing all roles: \n'))
            console.table(result);
            initialQuestion();
      })
};

viewDepartments = () => {
      db.query(`${queryDepartments}`, (err, result) => {
            if (err) throw err;
            console.log(chalk.bgHex('#526b48').white('\n Viewing all departments: \n'))
            console.table(result);
            initialQuestion();
      })
};

addDepartment = () => {
      db.query(`SELECT * FROM department`, (err, result) =>{
            if (err) throw err;
      inquirer.prompt ([
            {
                  type: `input`,
                  name: `dptName`,
                  message: `What is the name of this department?`,
                  validate: (dptNameInput) => {
                        if (dptNameInput) {
                              return true;
                        } else {
                              console.log(`Please enter the department name`);
                              return false;
                        }
                  }
            }
      ]).then((response) => {
            db.query(`INSERT INTO department SET ?`, 
        {
            name: response.dptName,
        },
        (err, res) => {
            if (err) throw err;
            console.log(chalk.bgHex('#526b48').white(`\n ${response.dptName} successfully added to database \n`))
            initialQuestion();
        })
      })
})
};

addRole = () => {
      db.query(`SELECT * FROM department;`, (err, res) => {
            if (err) throw err;
            let departments = res.map(department => ({name: department.name, value: department.id }));
            inquirer.prompt([
                {
                  type: 'input',
                  name: 'roleName',
                  message: 'What is the name of the role you want to add?',  
                  validate: (roleNameInput) => {
                        if (roleNameInput) {
                              return true;
                        } else {
                              console.log(`Please enter the role`);
                              return false;
                        }
                  }
                },

                {
                  type: 'input',
                  name: 'roleSalary',
                  message: 'What is the salary of the role you want to add?',
                  validate: (roleSalaryInput) => {
                        if (roleSalaryInput) {
                              return true;
                        } else {
                              console.log(`Please enter the salary`);
                              return false;
                        }
                  }
                },

                {
                  type: 'list',
                  name: 'roleDept',
                  message: 'Which department do you want to add the new role to?',
                  choices: departments
                }
            ]).then((response) => {
                db.query(`INSERT INTO role SET ?`, 
                {
                    title: response.roleName,
                    salary: response.roleSalary,
                    department_id: response.roleDept,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(chalk.bgHex('#526b48').white(`\n ${response.roleName} successfully added to database \n`))
                    initialQuestion();
                })
            })
        })
};

addEmployees = () => {
      db.query(`SELECT * FROM role;`, (err, res) => {
            if (err) throw err;
            let roles = res.map(role => ({name: role.title, value: role.id }));
            db.query(`SELECT * FROM employee;`, (err, res) => {
                if (err) throw err;
                let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
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
                        type: `list`,
                        name: `employeeRole`,
                        message: `What's this employee's role?`,
                        choices: roles,
                  },
      
                  {
                        type: `list`,
                        name: `employeeManager`,
                        message: `Who is the manager of this employee?`,
                        choices: employees,
                  }
                ]).then((response) => {
                  console.log(response.employeeFirst, response.employeeLast, response.employeeRole, response.employeeManager)

                    db.query(`INSERT INTO employee SET ?`, 
                    {
                        first_name: response.employeeFirst,
                        last_name: response.employeeLast,
                        role_id: response.employeeRole,
                        manager_id: response.employeeManager,
                    }, 

                    (err, res) => {
                        if (err) throw err;
                        console.log('error not here')
                    })
                    console.log(chalk.bgHex('#526b48').white(`\n ${response.employeeFirst} ${response.employeeLast} has been successfully added to database \n`))
                    initialQuestion();

                })
            })
        })
}


// FIXME: update role

updateEmployeeRole = () => {
      db.query(`SELECT * FROM role;`, (err, res) => {
            if (err) throw err;
            let roles = res.map(role => ({name: role.title, value: role.id }));

            db.query(`SELECT * FROM employee;`, (err, res) => {
                if (err) throw err;
                let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
                inquirer.prompt([
                  {
                        type: `list`,
                        name: `employeeUpdate`,
                        message: `Which employee would you like to update?`,
                        choices: employees,
                  },

                  {
                        type: `list`,
                        name: `roleUpdate`,
                        message: `What is this employee's new role?`,
                        choices: roles,
                  },

                ]).then((response) => {
                    db.query(`UPDATE employee SET ? WHERE ?`, 
                    [
                        {
                            role_id: response.roleUpdate,
                        },

                        {
                            id: response.employeeUpdate,
                        },
                    ], 

                    (err, res) => {
                        if (err) throw err;
                        console.log(chalk.bgHex('#526b48').white(`\n This role has been successfully updated in the employee database \n`))
                        initialQuestion();
                    })
                })
            })
        })
}

function exit() {
      console.log(chalk.bgHex('#526b48').white(`\n Thank you for visiting. Please come again! \n`))
      process.exit();
    }
    
// close inquirer input if user press "escape" key
process.stdin.on('keypress', (_, key) => {
      if (key.name === "escape") {
            exit();
      }
    });