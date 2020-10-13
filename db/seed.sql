USE employees;

INSERT INTO department(name) VALUES
("HR"),
("Engineering"),
("Accounting"),
("Crew");

INSERT INTO role(title, salary, department_id) VALUES
("HR Specialist", 60000, 1),
("Engineer", 100000, 2),
("Accountant", 106000,3),
("Filght Line", 90000,4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, NULL),
('Kevin', 'Tupik', 4, 3),
('Kunal', 'Singh', 1, NULL),
('Malia', 'Brown', 2, 5),
('Sarah', 'Lourd', 3, NULL),
('Tom', 'Allen', 4, 7);