DROP DATABASE IF EXISTS employee_db

CREATE DATABASE employee_db

USE employee_db

CREATE TABLE employees (
      employee_id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(30),
      last_name VARCHAR(30),
      -- TODO: populate from existing data
      employee_role
      employee_manager 
)



CREATE TABLE roles (
      role_name VARCHAR(30)
      -- TODO: populate from existing data
      role_department VARCHAR(30)
      role_salary INT
)



CREATE TABLE departments (
      deparment_name VARCHAR(30)
)