SELECT 
    department.id,
    department.dept_name,
    roles.title,
    roles.salary,
    employee.first_name,
    employee.last_name
FROM department
JOIN roles
ON department.id = roles.department_id
JOIN employee
ON roles.id = employee.role_id;

