// requirements
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
// const { listenerCount } = require('process');
const Connection = require('mysql2/typings/mysql/lib/Connection');

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
    password: '',
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