DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL,
    constraint  fk_department foreign key( department_id) references departments(id),
    PRIMARY KEY (id)

);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    constraint  fk_role foreign key( role_id) references role(id),
    manager_id INT,
    constraint  fk_employee foreign key( manager_id) references employee(id),
    PRIMARY KEY (id)
)