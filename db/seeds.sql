INSERT INTO department (dept_name)
VALUES  ("Engineering"),
        ("Legal"),
        ("Project management"),
        ("Research"),
        ("Human Resources"),
        ("Finance");


INSERT INTO roles (title, department_id, salary)
VALUES  ("Software Engineer", 1, 120000),
        ("Accountant", 6, 115000),
        ("Lawyer", 2, 190000);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Sarah", "Connor", 1),
        ("Elle", "Woods", 3),
        ("Elizabeth", "Bennet", 2);
