DROP DATABASE IF EXISTS employee_db

CREATE DATABASE employee_db

USE employee_db

CREATE TABLE employees (
      employee_id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30) NOT NULL,
      role_id INT NOT NULL
      manager_id INT NOT NULL 
)



CREATE TABLE roles (
      role_id INT AUTO_INCREMENT PRIMARY KEY,
      role_name VARCHAR(30) NOT NULL,
      -- FIXME: currency symbol
      role_salary INT
      department_id INT NOT NULL
)



CREATE TABLE departments (
      department_id INT AUTO_INCREMENT PRIMARY KEY,
      deparment_name VARCHAR(30) NOT NULL
)