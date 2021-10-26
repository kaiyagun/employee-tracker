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
          db.query('SELECT employee.first_name, employee.last_name, department.id, department.dept_name, roles.title, roles.salary FROM department JOIN roles ON department.id = roles.department_id JOIN employee ON roles.id = employee.role_id;', function (err, results) {
              console.table(results);
          });

      } else if(response.choices === 1) {
          const roleChoices = [];
          const chooseRole = () => db.query(`SELECT title FROM roles`, (err, result) => {
            for (let i = 0; i < result.length; i++) {
                const roles = result[i];

                roleChoices.push(`{name: '` + roles[i] +`', value: '`+ i++ + `'}`)                
            }
          })
          chooseRole()

          
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
                  choices: roleChoices
              }
          ])
        //   db.query('INSERT INTO')
        //   console.log('Added employee')
        }
    });
  
  