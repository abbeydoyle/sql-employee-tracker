# sql-employee-tracker
An app to view and manage the departments, roles, and employees in a company

## Description

This project uses npm, inquirer, fs, jest, and javascript to generate a Team Portfolio Page with user input. All input is given within the terminal using Inquirer, a command line interface for Node.js. With user input, the portfolio page has custom color themes. There are employee-specific prompts, allowing for more personilized employee cards. This webpage file is then written into the project repository with the Node File System module. Each class and subclass was tested using Jest script tests, ensuring the correct object types and function returns. This project introduced working in the command line with Node Package Manager (npm), using javascript to create functions, inquirer prompts, and a string that will populate the webpage.


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
- Copy the SSH code within this Github Repo 
- In the terminal, type “git clone {SSH Code}” 
- In the terminal, use the command "npm init -y" to install Node Package Manager 
- Use the command "npm install inquirer" to get npm's inquirer package 
- Use the command "npm install --save-dev jest" to get npm's jest package 
- Ensure proper installation with the command "npm test" in the terminal
- Still in the terminal, type “node index.js” 
- Simply follow the prompts to create your team's Portfolio Page
- Once complete, your index.html file will be written into the dist folder
<!-- What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running. -->


## Usage

There are 10 main sections of this repository:

- [SRC Folder](https://github.com/abbeydoyle/team-profile-generator/tree/main/src) - Contains a text file for ideas, a [generateHTML.js](https://github.com/abbeydoyle/team-profile-generator/blob/main/src/generateHTML.js) file, encoding the functions to create the Team Portfolio webpage based on the user input gathered from inquirer

- [index.js](https://github.com/abbeydoyle/team-profile-generator/blob/main/index.html) - Contains the main script of this application, encluding the file writing system and inquirer prompts

- [Dist Folder](https://github.com/abbeydoyle/team-profile-generator/tree/main/dist) - Created by the script to contain the index.html file generated through this app

- [Lib Folder](https://github.com/abbeydoyle/team-profile-generator/tree/main/lib) - Contains the scripts containing class and subclass creation

- [Notes Folder](https://github.com/abbeydoyle/team-profile-generator/tree/main/notes) - Contains a text file for ideas, a [structure.html](https://github.com/abbeydoyle/team-profile-generator/blob/main/notes/structure.html) html page to envision the final product of this application, and graveyard javascript files to place nonworking code for future reference

- [Test Folder](https://github.com/abbeydoyle/team-profile-generator/tree/main/test) - Contains Jest testing scripts for each class and subclass functions

- [gitignore](https://github.com/abbeydoyle/team-profile-generator/blob/main/.gitignore) - Contains all files to be ignored in the Github repository

- [License](https://github.com/abbeydoyle/module-two-challenge/blob/main/LICENSE) - Contains the webpage license

- [ReadMe](https://github.com/abbeydoyle/module-two-challenge/blob/main/README.md) - This file containing an executive overview of the project

- [Sample Webpage](https://abbeydoyle.github.io/team-profile-generator/) - This app has been used to generate a sample Team Portfolio that has been deployed at this link via Github Pages

Generated Webpage: [https://abbeydoyle.github.io/team-profile-generator/](https://abbeydoyle.github.io/team-profile-generator/)

![Screencastify demonstration](./dist/team-profile.gif)
![Earthy green](./dist/earthy%20green.png)
![Muted blues](./dist/muted%20blues.png)
![Rustic orange](./dist/rustic%20orange.png)
![Dusty pink](./dist/Dusty%20pink.png)
![Neutral](./dist/black-white.png)




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

![badmath](https://img.shields.io/github/repo-size/abbeydoyle/team-profile-generator?color=pink&style=plastic)

![badmath](https://img.shields.io/github/issues-closed-raw/abbeydoyle/team-profile-generator?color=pink&style=plastic)

![badmath](https://img.shields.io/github/issues-raw/abbeydoyle/team-profile-generator?color=pink&style=plastic)

![badmath](https://img.shields.io/github/license/abbeydoyle/team-profile-generator?color=pink&style=plastic)

![badmath](https://img.shields.io/github/commits-since/abbeydoyle/team-profile-generator/7aaca42/main?color=pink&style=plastic)

![badmath](https://img.shields.io/github/last-commit/abbeydoyle/team-profile-generator?color=pink&style=plastic)

![badmath](https://img.shields.io/maintenance/yes/2022?color=pink&style=plastic)


<!-- ![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time. -->

## Features

This page features:

- Keypress function to end process when ‘esc’ is pressed 
- Error messages if no input is given 
- File written directly into user’s system 
- Separate card generation based on employee role
- Email verification
- Jest class tests
- Built in Tailwind CSS
- Email links for all employees
- Github portfolio links for engineers
- Custom Color Themes



<!-- If your project has a lot of features, list them here. -->

<!-- ## How to Contribute

If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer. -->

## Tests

- Press ‘esc’ at any time to end the process
- Try to bypass an inquirer prompt and receive an error message
- Update an employee's role then select "View all employees" to verify your change occurred



- Select different employee types for role-specific prompts
- Add as many employees as desired and watch the correct card types and count populate
- Select an employee's email and your email program will open and populate the TO field
- Select your engineer's Github profile name and their portfolio will open
- Attempt to bypass a prompt and an error message will appear
- Attempt to type in a non-email string in the email prompt and an error message will appear
- Run the built in Jest tests with the command "npm test"
- Try out a different color theme each time!


<!-- Go the extra mile and write tests for your application. Then provide examples on how to run them here. -->