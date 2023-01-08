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

// Constant for database connection
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

// Connect to database
db.connect(err => {
      if (err) throw err;
      // console.log(`Database connection successful via id` + db.threadID);
      initialQuestion();
});

// opening question switch case
const initialQuestion = () => {

      inquirer.prompt ([
            {
                  type: `list`,
                  name: `purpose`,
                  message: `Welcome. If at any point you would like to exit the program, simply press the 'esc' key. What would you like to do?`,
                  choices: [`View all employees`, `View all roles`, `View all departments`, `Add employee`, `Add role`, 'Add department', `Update employee's role`, `Update employee's manager`, `Delete employee`, `Delete role`, `Delete department`, `View employees by manager`, `View employees by department`, `View department's totalized budget`, `Exit application`]
            }
      ])

      .then(function(response) {
            switch (response.purpose) {
                  case "View all employees": viewEmployees();
                  break;
                  case "View all roles": viewRoles();
                  break;
                  case "View all departments": viewDepartments();
                  break;
                  case "Add employee": addEmployees();
                  break;
                  case "Add role": addRole();
                  break;
                  case "Add department": addDepartment();
                  break;
                  case "Update employee's role": updateEmployeeRole();
                  break;
                  case "Update employee's manager": updateEmployeeManager();
                  break;
                  case "Delete employee": deleteEmployee();
                  break;
                  case "Delete role": deleteRole();
                  break;
                  case "Delete department": deleteDepartment();
                  break;
                  case "View employees by manager": sortEmployeesByManager();
                  break;
                  case "View employees by department": sortEmployeesByDepartment();
                  break;
                  case "View department's totalized budget": totalizeDepartmentBudget();
                  break;
                  default: db.end;
                  exit();
                  break;
            }
      });
};

// uses separate query file for viewing employees
viewEmployees = () => {
      db.query(`${queryEmployees}`, (err, result) => {
            if (err) throw err;
            console.log(chalk.bgHex('#526b48').white('\n Viewing all employees: \n'))
            console.table(result);
            initialQuestion();
      })
};

// uses separate query file for viewing roles
viewRoles = () => {
      db.query(`${queryRoles}`, (err, result) => {
            if (err) throw err;
            console.log(chalk.bgHex('#526b48').white('\n Viewing all roles: \n'))
            console.table(result);
            initialQuestion();
      })
};

// uses separate query file for viewing departments
viewDepartments = () => {
      db.query(`${queryDepartments}`, (err, result) => {
            if (err) throw err;
            console.log(chalk.bgHex('#526b48').white('\n Viewing all departments: \n'))
            console.table(result);
            initialQuestion();
      })
};

addEmployees = () => {
      // select all values from role set
      db.query(`SELECT * FROM role;`, (err, res) => {
            if (err) throw err;
            // map role ids to role titles to autopopulate in prompt
            let roles = res.map(role => ({name: role.title, value: role.id }));
            // select all employee values
            db.query(`SELECT * FROM employee;`, (err, res) => {
                if (err) throw err;
                // map employee ids to employees to populate to manager options
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
                  // double check for no undefined values from joining
                  console.log(response.employeeFirst, response.employeeLast, response.employeeRole, response.employeeManager)
                        // insert responses into employee set
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

addRole = () => {
      // select all values from department
      db.query(`SELECT * FROM department;`, (err, res) => {
            if (err) throw err;
            // map department ids to department name to autopoluate in inquirer prompt 
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
                  // insert reponses into role set
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

addDepartment = () => {
      // query all database values
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
            // query to insert response into department set
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

updateEmployeeRole = () => {
      // select all values from role
      db.query(`SELECT * FROM role;`, (err, res) => {
            if (err) throw err;
            // map roles for autopopulating prompt
            let roles = res.map(role => ({name: role.title, value: role.id }));

            // select all employee values
            db.query(`SELECT * FROM employee;`, (err, res) => {
                if (err) throw err;
                // map employee values for manager autopopulating
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
                        // update employee values
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

// TODO: bonus functions

updateEmployeeManager = () => {
       // select all employee values
      db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            // map employee values for manager autopopulating
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
                        name: `managerUpdate`,
                        message: `Who is this employee's manager?`,
                        choices: employees,
                  },

            ]).then((response) => {
                        // update employee values
                  db.query(`UPDATE employee SET ? WHERE ?`, 
                  [
                        {
                        manager_id: response.managerUpdate,
                        },

                        {
                        id: response.employeeUpdate,
                        },
                  ], 

                  (err, res) => {
                        if (err) throw err;
                        console.log(chalk.bgHex('#526b48').white(`\n This employee's manager has been successfully updated in the employee database \n`))
                        initialQuestion();
                  })
            })
            })
      
}

deleteEmployee = () => {
      
}

deleteRole = () => {
      
}

deleteDepartment = () => {
      
}

sortEmployeesByManager = () => {
      
}

sortEmployeesByDepartment = () => {
      
}

totalizeDepartmentBudget = () => {

}

// exit function
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