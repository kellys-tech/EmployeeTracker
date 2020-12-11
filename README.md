# EmployeeTracker

### GitHub Repo: https://github.com/kellys-tech/EmployeeTracker
### Video: https://youtu.be/GHkIj2yBjf4

![License](https://img.shields.io/badge/license-MIT-blue)

*This is an employee management app. This app is designed to keep track departments, roles and employees. The user will have the options to view and enter new departments, view an enter new roles and view and enter new employees. Employee roles can also be updated.*

## Employee Tracker created using:
* JavaScript
* MySql

## Features
### View in Terminal
* User can view a table of departments with colums
    * id (auto generated)
    * department name
* User can view a table of roles with columns
    * id (auto generated)
    * title
    * salary
    * department_id (from joined departments table)
    * department_name (from joined departments table)
* User van view a table of employees with columns
    * id (auto generated)
    * first_name
    * last_name
    * title
    * department_name (joined from departments table)
    * salary
    * manager_first_name (joined from role table based on employee's manager id)
    * manager_last_name (joined from tole table based on employee's manager id)

### Add through Terminal
* User can add a department to the departments table by entering the following information. A unique id is auto generated.
    * department name
* User can enter a role into the role table by entering the following information. A unique id is auto generated.
    * title
    * salary
    * department_id (as it relates to the departments table)
* User can enter an employee into the employee table by entering the following information. A unique id is auto generated.
    * first_name
    * last_name
    * role_id (based off the role table)
    * manager_id (if applicable, based off the role table)

## Update through Terminal
* User can update an employee's role through the terminal by entering the following information
    * the id of the user to be updated (based off the employee table)
    * the new role id for the employee (based off the role table)

## Future updates
* Future updates to include the following:
    * Updating employee's managers
    * Viewing employees by manager
    * Deleting departments, roles and employees
    * Viewing the total budget for a department

## Dependencies
    * npm package console.table
    * npm package dotenv,
    * npm package inquirer,
    * npm package mysql
    * mysql workbench

## How to use
* The user will clone repository.
* The user will need to create a .env file and enter their mysql workbench port, username and password
* The user will need to create the database in mysql workbench
* The user will need to do an `npm i` to install dependencies that are listed in tihe package.json file

## License
This project is licensed under the terms of the MIT license.

## Contributing
If you would like to contribute please contact me directly by submitting an issue through my github repo.

## Contact
If you have any questions you can contact me through my github repo, listed at the top of the page or by emailing me at kellysmith.r77@gmail.com

## Screenshots
![NoteTakerDemo](https://github.com/kellys-tech/NoteTaker-Express/blob/main/public/assets/Image/NoteTakerDemo.mov)