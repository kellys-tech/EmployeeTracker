var mysql = require("mysql");
var inquirer = require("inquirer");

//create connection to the database. this will be replaced with the user's info
var connection = mysql.createConnection({
    host: "localhost",
    //user's port
    port: 3306,
    //user's u/n
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