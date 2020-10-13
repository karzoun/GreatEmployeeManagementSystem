const inquirer = require("inquirer");
const DB = require("./db");
require("console.table");

const startQuestions = () => {
    inquirer
        .prompt([{
            type: "list",
            name: "userChoice",
            message: "What do you want to do?",
            choices: [{
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
                    addEmployee(); //
                    break;
                case "ADD_ROLES":
                    addRole(); //
                    break;
                case "ADD_DEPARTMENT":
                    addDepartmant();
                    break;
                case "VIEW_EMPLOYEE":
                    viewEmployees(); //
                    break;
                case "VIEW_DEPARTMENT":
                    viewDepartmants(); //
                    break;
                case "VIEW_ROLES":
                    viewRoles(); //
                    break;
                case "UPDATE_EMPLOYEE_ROLE":
                    updateEmployeeRole(); //
                    break;
                case "UPDATE_EMPLOYEE_MANAGER":
                    updateEmployeeManager();
                    break;
                default:
                    return process.exit();
                    break;
            }
        });
};

startQuestions();

//wrtie all function for data processing
const addEmployee = async() => {
    const employees = await DB.findAllEmployees();

    const employee = await inquirer.prompt([{
            name: "first_name",
            message: "What is the employee's first name?",
        },
        {
            name: "last_name",
            message: "What is the employee's last name?",
        },
    ]);
    const roles = await DB.findAllRoles();

    const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
    }));

    const roleId = await inquirer.prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices,
    });

    employee.role_id = roleId.roleId;

    const managerChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));
    managerChoices.unshift({ name: "None", value: null });

    const managerId = await inquirer.prompt({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices,
    });

    employee.manager_id = managerId.managerId;

    await DB.createEmployee(employee);

    startQuestions();
};

async function addRole() {
    const departments = await DB.findAllDepartments();

    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
    }));

    const role = await inquirer.prompt([{
            name: "title",
            message: "What is the name of the role?",
        },
        {
            name: "salary",
            message: "What is the salary of the role?",
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentChoices,
        },
    ]);

    await DB.createRole(role);

    console.log(`Added ${role.title} to the database`);

    startQuestions();
}

async function updateEmployeeRole() {
    const employees = await DB.findAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    const { employeeId } = await inquirer.prompt([{
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices,
    }, ]);

    const roles = await DB.findAllRoles();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
    }));

    const { roleId } = await inquirer.prompt([{
        type: "list",
        name: "roleId",
        message: "Which role do you want to assign the selected employee?",
        choices: roleChoices,
    }, ]);

    await DB.updateEmployeeRole(employeeId, roleId);

    console.log("Employee Updated!");

    startQuestions();
}
async function updateEmployeeManager() {
    const employees = await DB.findAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    const { employeeId } = await inquirer.prompt([{
        type: "list",
        name: "employeeId",
        message: "Which employee's Manager do you want to update?",
        choices: employeeChoices,
    }, ]);

    const manager = await DB.findAllEmployees();

    const managerChoices = manager.map(({ id, title }) => ({
        name: title,
        value: id,
    }));

    const { managerId } = await inquirer.prompt([{
        type: "list",
        name: "roleId",
        message: "Which Manager do you want to assign the selected employee?",
        choices: managerChoices,
    }, ]);

    await DB.updateEmployeeManager(employeeId, managerId);

    console.log("Manager Updated!");

    startQuestions();
}
async function viewRoles() {
    const roles = await DB.findAllRoles();
    console.table(roles);

    startQuestions();
}
async function viewEmployees() {
    const employee = await DB.findAllEmployees();
    console.table(employee);

    startQuestions();
}
async function viewDepartmants() {
    const department = await DB.findAllDepartments();
    console.table(department);

    startQuestions();
}