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
('Moe', 'Salah', 1, NULL),
('Sadeo', 'Mane', 2, 1),
('James', 'Rodriguez', 3, NULL),
('Kevin', 'De Bruyne', 4, 3),
('Alexander', 'Lacazette', 1, NULL),
('Virgil', 'van Djik', 2, 5),
('Jurgen', 'Klopp', 3, NULL),
('Tom', 'Allen', 4, 7);