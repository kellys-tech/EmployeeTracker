const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")

//create connection to the database. this will be replaced with the user's info
var connection = mysql.createConnection({
    host: "localhost",
    //user's port
    port: 3306,
    //user's username
    user: "root",
    //user's password
    password: "root",
    //db name to connect to
    database: "employeeTracker_DB"
})
//handle error case by returning an error if the databse is not found
connection.connect(function(err) {
    if(err) throw err;
    //run begin function to start questions if a connection is made
    begin()
})

//function to ask question
function begin() {
    //prompt for what the user would like to do
    inquirer.prompt ({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Role", "View Employee", "Update Employee Role", "Done"]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "Add Department"://Done
                addDept();
                break;
            case "Add Role"://Done
                addRole();
                break;
            case "Add Employee"://Done
                addEmpl();
                break;
            case "View Departments":
                viewDept();
                break;
            case "View Role":
                viewRole();
                break;
            case "View Employee":
                viewEmpl();
                break;
            case "Update Employee Role":
                updtRole();
                break;
            case "Done":
                connection.end();
        }
    })
}

// function getDepartmentId(){
//     //mysql return res
//     //var allId=res.map(res.id);
//     //addDept(allid);

// }

//ADD DEPARTMENT function
//later validate department id if I have time
function addDept() {
    inquirer.prompt ({
        name: "name",
        type: "input",
        message: "Enter a department name."
        
    }).then(function(userInput){
        console.log("Inserting a new department...\n");
        var query = connection.query(
          "INSERT INTO departments SET ?",
          {
            name: userInput.name
          },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " department inserted!\n");
            // Call begin() after the insert completes
            begin();
          }
        );
        // logs the actual query being run
        console.log(query.sql);

    })
}

function addRole() {
        inquirer.prompt ([
        {
            name: "title",
            type: "input",
            message: "Enter a title for the role.",
        },
        {
            name: "salary",
            type: "input",
            message: "Enter the salary for this role.",  
        },
        {
            name: "department_id",
            type: "input",
            message: "Enter id of the department this role is in.",  
        },
        ]).then(function(userInput){
            console.log("Inserting a new role...\n");
            var query = connection.query(
              "INSERT INTO role SET ?",
              {
                title: userInput.title,
                salary: userInput.salary,
                department_id: userInput.department_id,

              },
              function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role inserted!\n");
                // Call begin() after the insert completes
                begin();
              }
            );
            // logs the actual query being run
            console.log(query.sql);
        })
}

function addEmpl() {
    inquirer.prompt ([
        {
            name: "first_name",
            type: "input",
            message: "Enter employee's first name.",
        },
        {
            name: "last_name",
            type: "input",
            message: "Enter employee's last name.",  
        },
        {
            name: "role_id",
            type: "input",
            message: "Enter the role_id of the employee.",  
        },
        {
            name: "manager_id",
            type: "input",
            message: "Enter their manager id if applicable or hit Enter to continue without manager id."
        }
        ]).then(function(userInput){
            console.log("Inserting a new employee...\n");
            var query = connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: userInput.first_name,
                last_name: userInput.last_name,
                role_id: userInput.role_id,
                manager_id: userInput.manager_id,
              },
              function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee!\n");
                // Call begin() after the insert completes
                begin();
              }
            );
            // logs the actual query being run
            console.log(query.sql);
        })
}

function viewDept() {
    console.log("Selecting all departments...\n");
  connection.query("SELECT * FROM departments", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
  });
}

function viewRole() {
    console.log("Selecting all roles...\n");
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      console.log(res)
    });
    begin();

}

function viewEmpl() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      console.log(res)
    });

}

function updtRole() {
    inquirer.prompt ([
        {
        name: "employee_id",
        type: "input",
        message: "Enter the ID of the employee you want to update."
        },
        {
            name: "role_id",
            type: "input",
            message: "Enter the new id of the employee's role"
        }
    ])
    .then (function (userInput) {
        console.log("Updating employee role")
        var query = connection.query (
            "UPDATE employee SET ? WHERE ?",
            [
                {
                    role_id: userInput.role_id
                },
                {
                    id: userInput.id
                },
            ],
            function(err, res) {
                if (err) throw err;
                console.log("Your employee role was updated successfully!");
                // Call begin() after the insert completes
                begin();
            }
        )
    })

}