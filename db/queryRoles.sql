SELECT role.id as id, title, department.name as department, salary 
FROM role
JOIN department ON role.department_id = department.id
ORDER BY role.id ASC