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
        name: "addViewDelete",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Role", "View Employee", "Update Employee Role", "Done"]
    })
    .then(function(answer) {
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
//ADD DEPARTMENT function
function addDept() {
    //prompt user to enter department name
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter the department name.",
        //validate if answer was input
        validate: function(value) {
        //if yes, return true
            if (isNaN(value)=== false) {
                return true;
            }
            //if not return false
            return false;
        }
    })
    .then(function(answer) {
        connection.query(
            "INSERT INTO departments SET?", {
                name: answer.name
            },
            function(err) {
                if(err) throw err;
                console.log("Your department was added successfully");
                begin();
            }
        );
    });
}

function addRole() {

}

function addEmpl() {

}

function viewDept() {

}

function viewRole() {

}

function viewEmpl() {

}

function updtRole() {

}