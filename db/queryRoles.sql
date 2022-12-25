-- assign values to ids to join tables
SELECT role.id as id, title, department.name as department, salary 
FROM role
-- join if ids match
JOIN department ON role.department_id = department.id
ORDER BY role.id ASC