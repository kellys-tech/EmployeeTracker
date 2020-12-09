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
    password: "",
    //db name to connect to
    database: "employeeTracker_DB"
})
//handle error case by returning an error if the databse is not found
connection.connect(function(err) {
    if(err) throw err;
    //run search function if a connection is made to the db
    runSearch();
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
                delDept();
                break;
            case "Done":
                connection.end();
        }
    })
}