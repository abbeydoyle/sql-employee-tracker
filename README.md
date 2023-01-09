# sql-employee-tracker
An app to view and manage the departments, roles, and employees in a company

## Description

This project uses npm, inquirer, fs, sql, and javascript to generate an employee tracker database with user input. All input is given within the terminal using Inquirer, a command line interface for Node.js. With prompt inputs, a user can view, create, update, and delete employees, roles, and departments. Employees can also be filtered by managers and departments. Each department's totalized budget can be viewed as well. This database can be built from the ground up or altered by sourcing the seeds.sql file.

<!-- Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:

- What was your motivation?
- Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")
- What problem does it solve?
- What did you learn? -->

## Table of Contents (Optional)

<!-- If your README is long, add a table of contents to make it easy for users to find what they need. -->

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)
- [Features](#features)
- [Tests](#tests)

## Installation

Applications required for use: 
- Bash
- VSCode
- Node.js 

Initialization: 
Copy the SSH code within this Github Repo 
```
git clone {SSH Code}
npm init -y
npm install --save mysql2
npm i inquirer@8.2.4
npm install console.table --save
mysql -u root -p
source db/schema.sql
source db/seeds.sql *
exit
node server.js
```
*skip this code entry if you would like to begin with a completely empty database
<!-- What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running. -->


## Usage

There are 7 main sections of this repository:

- [server.js](https://github.com/abbeydoyle/sql-employee-tracker/blob/main/server.js) - Contains the main script of this application, including the inquirer prompts and all case functions

- [DB Folder](https://github.com/abbeydoyle/sql-employee-tracker/tree/main/db) - Contains the schema and seeds sql files, along with the sql files encoding the 'View All' queries

- [Notes Folder](https://github.com/abbeydoyle/team-profile-generator/tree/main/notes) - Contains a text file for ideas, a [structure.html](https://github.com/abbeydoyle/team-profile-generator/blob/main/notes/structure.html) html page to envision the final product of this application, and graveyard javascript files to place nonworking code for future reference

- [Graveyard Folder](https://github.com/abbeydoyle/sql-employee-tracker/tree/main/graveyard) - Contains nonworking code for future reference

- [gitignore](https://github.com/abbeydoyle/sql-employee-tracker/blob/main/.gitignore) - Contains all files to be ignored in the Github repository

- [License](https://github.com/abbeydoyle/sql-employee-tracker/blob/main/LICENSE) - Contains the application license

- [ReadMe](https://github.com/abbeydoyle/sql-employee-tracker/blob/main/README.md) - This file containing an executive overview of the project

Click the gif below to be redirected to the recorded video of this app in use.

[![Screencastify demonstration](./graveyard/employee_tracker.gif)](https://drive.google.com/file/d/1PImDcC3eLUBW3fNFCsXXFztmgSc3FtUB/view)


<!-- Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ``` -->

## Credits

This webpage was built using UW Trilogy Bootcamp class materials as references.


## License

MIT License

Copyright (c) 2022 abbeydoyle

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<!-- The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/). -->

---

<!-- 🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections. -->

## Badges

![badmath](https://img.shields.io/github/repo-size/abbeydoyle/sql-employee-tracker?color=pink&style=plastic)

![badmath](https://img.shields.io/github/issues-closed-raw/abbeydoyle/sql-employee-tracker?color=pink&style=plastic)

![badmath](https://img.shields.io/github/issues-raw/abbeydoyle/sql-employee-tracker?color=pink&style=plastic)

![badmath](https://img.shields.io/github/license/abbeydoyle/sql-employee-tracker?color=pink&style=plastic)

![badmath](https://img.shields.io/github/commits-since/abbeydoyle/sql-employee-tracker/765ff6d/main?color=pink&style=plastic)

![badmath](https://img.shields.io/github/last-commit/abbeydoyle/sql-employee-tracker?color=pink&style=plastic)

![badmath](https://img.shields.io/maintenance/yes/2023?color=pink&style=plastic)


<!-- ![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time. -->

## Features

This app features:

- Keypress function to end process when ‘esc’ is pressed 
- Error messages if no input is given 
- Add functions for employees, roles, and departments
- Capability to update an employee's role or manager
- Delete functionw for employees, roles, and departments
- Capability to filter employees by manager or department
- Capability to view the totalized budget of each department


<!-- If your project has a lot of features, list them here. -->

<!-- ## How to Contribute

If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer. -->

## Tests

- Press ‘esc’ at any time to end the process
- Try to bypass an inquirer prompt and receive an error message
- Add an employee, role, or department then select "View all employees/roles/departments" to verify your addition occurred
- Update an employee's role or manager then select "View all employees" to verify your change occurred
- Delete an employee, role, or department then select "View all employees/roles/departments" to verify your deletion occurred
- Sort employees by various managers or departments to view a more succinct list
- View a department's budget as the totalized salary of that department's employees

<!-- Go the extra mile and write tests for your application. Then provide examples on how to run them here. -->