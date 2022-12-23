-- data populating the database at the time it is created

INSERT INTO department
      (name)

VALUES
      (`Engineering`),
      (`Finance`),
      (`Legal`),
      (`Sales`);



INSERT INTO role 
      (title, salary, department_id)

VALUES
      (`Lead Engineer`, `150000`, 1),
      (`Software Engineer`, `120000`, 1),
      (`Account Manager`, `160000`, 2),
      (`Accountant`, `125000`, 2),
      (`Legal Team Lead`, `250000`, 3),
      (`Lawyer`, `190000`, 3),
      (`Sales Lead`, `100000`, 4),
      (`Salesperson`, `80000`, 4);



INSERT INTO employee 
      (first_name, last_name, role_id, manager_id)

VALUES
      (`Ashley`, `Rodriguez`, `Lead Engineer`, 1, NULL),
      (`Kevin`, `Tupik`, `Software Engineer`, 1, 1),
      (`Kunal`, `Singh`, `Account Manager`, 2, NULL),
      (`Malia`, `Brown`, `Accountant`, 2, 3),
      (`Sarah`, `Lourd`, `Legal Team Lead`, 3, NULL),
      (`Tom`, `Allen`, `Lawyer`, 3, 5),
      (`John`, `Doe`, `Sales Lead`, 4, NULL),
      (`Mike`, `Chan`, `Salesperson`, 4, 7);