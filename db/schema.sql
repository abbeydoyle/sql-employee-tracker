-- drops database if it currently exists, move to next line if doesnt
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

-- primary key is in current table, foreign key is in column referenced from another table
-- primary key used for unique id, foreign key is relational database
-- primary key cannot be null, foreign key can

CREATE TABLE department (
      id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
      name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(30) NOT NULL,
      salary DECIMAL NOT NULL,
      department_id INT,
      FOREIGN KEY (department_id)
      REFERENCES department(id)
      ON DELETE SET NULL
);

CREATE TABLE employee (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30) NOT NULL,
      role_id INT,
      manager_id INT,
      FOREIGN KEY (role_id)
      REFERENCES role(id)
      ON DELETE SET NULL
);