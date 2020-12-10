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
connection.connect(function (err) {
    if (err) throw err;
    //if successful show connction info in terminal
    console.log("connected as id " + connection.threadId);
    //run begin function to start questions if a connection is made
    begin()
})

//function to ask question
function begin() {
    //ask user to select an option from the list
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Role", "View Employee", "Update Employee Role", "Done"]
    })
        .then(function (answer) {
            switch (answer.action) {
                case "Add Department":
                    addDept();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmpl();
                    break;
                case "View Departments":// need to add join
                    viewDept();
                    break;
                case "View Role": //need to add join
                    viewRole();
                    break;
                case "View Employee"://need to add join
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

//ADD DEPARTMENT function
function addDept() {
    //ask user to enter department name
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter a department name."
    }).then(function (userInput) {
        console.log("Inserting a new department...\n");
        // insert new department name into departments table
        var query = connection.query(
            "INSERT INTO departments SET ?",
            {
                name: userInput.name
            },
            // error handling
            function (err, res) {
                //throw error if insert is unsuccessful
                if (err) throw err;
                //if successful, show affected row in console
                console.log(res.affectedRows + " department inserted!\n");
                // Call begin() after the insert completes for user to do another action
                begin();
            }
        );
        // logs the actual query being run
        console.log(query.sql);

    })
}

//ADD ROLE function
function addRole() {
    // ask user to input new role data
    inquirer.prompt([
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
    ]).then(function (userInput) {
        console.log("Inserting a new role...\n");
        var query = connection.query(
            //insert new role into role table
            "INSERT INTO role SET ?",
            {
                title: userInput.title,
                salary: userInput.salary,
                department_id: userInput.department_id,
            },
            //error handling
            function (err, res) {
                //throw error if unsuccesful
                if (err) throw err;
                //if successful, show affected row in console
                console.log(res.affectedRows + " role inserted!\n");
                // Call begin() after the insert completes for user to do another action
                begin();
            }
        );
        // logs the actual query being run
        console.log(query.sql);
    })
}

//ADD EMPLOYEE function
function addEmpl() {
    //ask user to enter new employee data
    inquirer.prompt([
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
    ]).then(function (userInput) {
        console.log("Inserting a new employee...\n");
        var query = connection.query(
            //insert new employee into employee table
            "INSERT INTO employee SET ?",
            {
                first_name: userInput.first_name,
                last_name: userInput.last_name,
                role_id: userInput.role_id,
                manager_id: userInput.manager_id,
            },
            //error handling
            function (err, res) {
                //throw error if unsuccesful
                if (err) throw err;
                //if successful, show affected row in console
                console.log(res.affectedRows + " employee!\n");
                // Call begin() after the insert completes for user to do another action
                begin();
            }
        );
        // logs the actual query being run
        console.log(query.sql);
    })
}

//VIEW DEPARTMENT function
function viewDept() {
    console.log("Selecting all departments...\n");
    //run sql query to select and display all rows and columns from departments table
    connection.query("SELECT * FROM departments", function (err, res) {
        //throw error if select is unsuccessful
        if (err) throw err;
        // if successful, return all results of select satement as a table
        console.table(res);
    });
}

//VIEW ROLE function
function viewRole() {
    console.log("Selecting all roles...\n");
    //run sql query to select and display all rows and columns from role table
    connection.query("SELECT role.id, role.title, role.salary, role.department_id, departments.name FROM role INNER JOIN departments ON departments.id = role.department_id",
    function (err, res) {
        //throw error if select is unsuccessful
        if (err) throw err;
        //if successful, return all results of select statement as a table
        console.table(res);
        begin();
    });
}

//VIEW EMPLOYEE function
function viewEmpl() {
    console.log("Selecting all employees...\n");
    //run sql query to select and display all rows and colums from the employee table
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, role.department_id, departments.name, employee.manager_id FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN departments ON departments.id = role.department_id"), function (err, res) {
        //throw error if select is unsuccessful
        if (err) throw err;
        //if successful, return all results of select statement as a table
        console.table(res);
    };
}

//UPDATE ROLE function
function updtRole() {
    //ask user to enter ID of employee to be updated
    inquirer.prompt([
        {
            name: "employee_id",
            type: "input",
            message: "Enter the ID of the employee you want to update."
        },
        // ask user to enter the new role ID for the employee
        {
            name: "role_id",
            type: "input",
            message: "Enter the new role id for the employee."
        }
    ])
        .then(function (userInput) {
            console.log("Updating employee role")
            var query = connection.query(
                //run update query on employee table to set the role id of the employee
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: userInput.role_id
                    },
                    {
                        id: userInput.id
                    },
                ],
                function (err, res) {
                    //throw error if update in unsuccessful
                    if (err) throw err;
                    //if successful
                    console.log(res.affectedRows + "was updated successfully!");
                    // Call begin() after the insert completes
                    begin();
                }
            );
        });
}