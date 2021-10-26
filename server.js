const inquirer = require("inquirer");
const cTable = require("console.table");

const mysql = require("mysql2");

const db = mysql.createConnection(
{
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees_db"
},
 console.log('Connected to employees_db database')
);


inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choices",
      choices: [
        { name: "View all employees", value: 0 },
        { name: "Add employee", value: 1 },
        { name: "View all roles", value: 2 },
        { name: "Add role", value: 3 },
        { name: "View all departments", value: 4 },
        { name: "Add a department", value: 5 },
        { name: "Update employee role", value: 6 },
      ],
    },
  ]).then((response) => {

      if(response.choices === 0) {
          //show employees
          db.query('SELECT employee.first_name, employee.last_name, department.id, department.dept_name, roles.title, roles.salary FROM department JOIN roles ON department.id = roles.department_id JOIN employee ON roles.id = employee.role_id;', function (err, results) {
              console.table(results);
          });

    } else if(response.choices === 2) {
      //show roles
          db.query('SELECT * FROM roles;', function (err, results) {
              console.table(results);
          }); 
    
    } else if(response.choices === 4 ) {
        //show depts
        db.query('SELECT * FROM department;', function(err, results) {
            console.table(results);
        })
    } else if(response.choices === 1) {
        // add employee
        
        return inquirer.prompt([
              {
                  type: 'input',
                  name: 'firstname',
                  message: 'Employee first name?'
              },
              {
                  type: 'input',
                  name: 'lastname',
                  message: 'Employee last name?'
              },
              {
                  type: 'list',
                  name: 'roles',
                  choices: [{

                  }]
              }
          ]);
    } else if(response.choices === 3) {
        // add role
        return inquirer.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'New role name?'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Salary of new role?'
            },
            {
                type: 'list',
                name: 'newRoleDept',
                choices: [{

                }]
            }
        ])
    } else if(response.choices === 5) {
        //add dept
        return inquirer.prompt([
            {
                type: 'input',
                name: 'newDept',
                message:'New department name?'
            }
        ]).then(db.query(`INSERT INTO department (dept_name) VALUES (${response});`, function(err, results) {
            console.log('Successfully added new department!')
        })
 );
  } else if(response.choices === 6) {
      // update role
      return inquirer.prompt([
          {
              type: 'list',
              name: 'employeeSelect',
              message: 'Which employee would you like to update?'
          },
          {
              type: 'list',
              name: 'newEmployeeRole',
              message: 'New role for employee?'
          }
      ])
  }
});
        

          
          
        //   const addEmployee = function() {db.query('INSERT INTO')
        //   console.log('Added employee')
        // };
        // addEmployee()
  
  
  