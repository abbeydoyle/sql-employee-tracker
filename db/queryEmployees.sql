-- assign values to ids to join tables
SELECT employee.id AS id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(manager.first_name, " ", manager.last_name) AS Manager
FROM employee
-- join if ids match
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id
ORDER BY employee.id ASC;