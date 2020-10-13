const inquirer = require("inquirer");
const DB = require("./db");
require("console.table");

const startQuestions = () => {
    inquirer
        .prompt([{
            type: "list",
            name: "userChoice",
            message: "What do you want to do?",
            chocies: [{
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE",
                },
                {
                    name: "Add roles",
                    value: "ADD_ROLES",
                },
                {
                    name: "Add department",
                    value: "ADD_DEPARTMENT",
                },
                {
                    name: "View Employee",
                    value: "VIEW_EMPLOYEE",
                },
                {
                    name: "View roles",
                    value: "VIEW_ROLES",
                },
                {
                    name: "View department",
                    value: "VIEW_DEPARTMENT",
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE",
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER",
                },
            ],
        }, ])
        .then((answer) => {
            switch (answer.userChoice) {
                case "ADD_EMPLOYEE":
                    addEmployee();
                    break;
                case "ADD_ROLES":
                    addRole();
                    break;
                case "ADD_DEPARTMENT":
                    addDepartmant();
                    break;
                case "VIEW_EMPLOYEE":
                    viewEmployee();
                    break;
                case "VIEW_DEPARTMENT":
                    viewDepartmant();
                    break;
                case "VIEW_ROLES":
                    viewRole();
                    break;
                case "UPDATE_EMPLOYEE_ROLE":
                    updateEmployeeRole();
                    break;
                case "UPDATE_EMPLOYEE_MANAGER":
                    updateEmployeeManager();
                    break;
                default:
                    return exit();
                    break;
            }
        });
};

startQuestions();

//wrtie all function for data processing
const addEmployee = () => {

}