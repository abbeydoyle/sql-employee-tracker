// requirements
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
// const Connection = require('mysql2/typings/mysql/lib/Connection');
const { listenerCount } = require('process');

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
    password: 'password',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

db.connect(err => {
      if (err) throw err;
      console.log(`Database connection successful via id` + db.threadID);
      initialQuestion();
})


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
      })
}

// TODO: view functions will be table queries

viewEmployees = () => {
      db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) throw err;
            console.log(response.length + ` employees found:`)
            console.table(result);
            initialQuestion();
      })
}

viewRoles = () => {
      db.query(`SELECT * FROM role`, (err, result) => {
            if (err) throw err;
            console.table(result);
            initialQuestion();
      })
}

viewDepartments = () => {
      db.query(`SELECT * FROM department`, (err, result) => {
            if (err) throw err;
            console.table(result);
            initialQuestion();
      })
}

// TODO: add functions will be prompts then queries

addEmployees = () => {
      // db.query(`SELECT * FROM employee, role`, (err, result) => {
      //       if (err) throw err;
      
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
      ]).then((answers) => {
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                  if (err) throw err;
                  for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }

                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.employeeFirst, answers.employeeLast, role.id, answers.employeeManager], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.employeeFirst} ${answers.employeeLast} to the database.`)
                        initialQuestion();
                    });
            })     
      })
      // })
}

addRole = () => {

}

addDepartment = () => {
      inquirer.prompt ([
            {
                  type: `input`,
                  title: `dptName`,
                  message: `What is the name of this department?`,
                  validate: (dptNameInput),
            }
      ])
}