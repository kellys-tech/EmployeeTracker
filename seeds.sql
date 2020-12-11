USE employeeTracker_DB;
INSERT INTO departments (name)
VALUES ("HR");

INSERT INTO departments (name)
VALUES ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("IT Manager", 60000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 40000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brad", "Williams", 2, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kristine", "Barger", 3, 2);