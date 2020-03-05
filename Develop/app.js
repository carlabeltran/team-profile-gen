//////////////////////////////////////////////////////////////////
//CLASS MANAGER
const Manager = require("./lib/Manager");
//CLASS ENGINEER
const Engineer = require("./lib/Engineer");
//CLASS INTERN
const Intern = require("./lib/Intern");
//////////////////////////////////////////////////////////////////
//PROMPTS THE USER
const inquirer = require("inquirer");
//WE ARE ESTABLISHING THE ABSOLUTE PATH
const path = require("path");
//FILE SYSTEM
const fs = require("fs");
//////////////////////////////////////////////////////////////////
//​CREATING A OUTPUT FOLDER
const OUTPUT_DIR = path.resolve(__dirname, "output");
//CREATING A FILE IN THE OUTPUT FOLDER
const outputPath = path.join(OUTPUT_DIR, "main.html");
//////////////////////////////////////////////////////////////////
//
const render = require("./lib/htmlRenderer");
////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//EMPTY TEAM ARRAY WITH ALL THE EMPLOYEES
const employees = [];
//EMPTY ARRAY WITH ALL THE EMPLOYEE IDS
const employeeID = [];
//////////////////////////////////////////////////////////////////

//THIS FUNCTION WILL WELCOME THE USER
function welcome() {
    console.log("Welcome to the Team Profile Generator App!");
    console.log("Team work makes the dream work!");
    inquirer
        .prompt([
            {
                type: "input",
                name: "teamName",
                message: "What is your team's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character!";
                }
            }
        ])
        .then(teamNameData => {
            const teamName = teamNameData.teamName;
            console.log(`Welcome ${teamName}`);
            employees.push(teamNameData);
            createTeam();
        });

};

welcome();

function createTeam() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "selectTeam",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members",
                ],
            }
        ])
        .then(data => {
            const role = data.selectTeam;
            employees.push(role)
            switch (data.selectTeam) {
                case "Manager":
                    addManager();
                    break;
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        })
}

//THIS FUNCTION WILL ADD MANAGER
function addManager() {
    console.log(
        "Leaders need to provide strategy and direction and to give employees the tools that enable them to gather information and insight from around the world. Leaders shouldn’t try to make every decision -Bill Gates, founder of Microsoft"
    );
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character!";
                }
            },
            {
                type: "input",
                name: "id",
                message: "What is your manager's ID?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }

                    return "Please enter a number greater than zero!";
                }
            },
            {
                type: "input",
                name: "email",
                message: "What is your manager's email?",
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }

                    return "Please check email and enter a valid email address!";
                }
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Please enter manager's office number:",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }

                    return "Please enter a number greater than zero!";
                }
            }
        ])
        .then(answers => {
            const manager = new Manager(
                answers.name,
                answers.id,
                answers.email,
                answers.officeNumber
            );
            //PUSHING MANAGER TO TEAM ARRAY
            employees.push(manager);
            employeeID.push(answers.id);
            createTeam();
        });
}

//THIS FUNCTION ADDS ENGINEER
function addEngineer() {
    console.log("The engineer has been, and is, a maker of history.— James Kip Finch, American engineer and educator");
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character!";
                }
            },
            {
                type: "input",
                name: "id",
                message: "What is your engineer's ID?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        if (employeeID.includes(answer)) {
                            return "This ID is already taken.Please enter another ID.";
                        } else {
                            return true;
                        }
                    }

                    return "Please enter a number greater than zero!";
                }
            },
            {
                type: "input",
                name: "email",
                message: "Whats is your engineer's email?",
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }

                    return "Please check email and enter a valid email address!";
                }
            },
            {
                type: "input",
                name: "github",
                message: "What is your engineer's gitHub username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }

                    return "Please enter at least one character!";
                }
            }
        ])
        .then(answers => {

            const engineer = new Engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.github,
            );
            //PUSHING ENGINEER TO TEAM ARRAY
            employees.push(engineer);
            //PUSHING ENGINEER ID TO EMPLOYEE ID ARRAY
            employeeID.push(answers.id);

            createTeam();
        });
}
//THIS FUNCTION ADDS INTERN
function addIntern() {
    console.log("Put your heart, mind, and soul into even your smallest acts. This is the secret of success.-Swami Sivananda");
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character!";
                }
            },
            {
                type: "input",
                name: "id",
                message: "What is your intern's ID?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        if (employeeID.includes(answer)) {
                            return "This ID is already taken.Please enter another ID.";
                        } else {
                            return true;
                        }
                    }

                    return "Please enter a number greater than zero!";
                }
            },
            {
                type: "input",
                name: "email",
                message: "Whats is your intern's email?",
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }

                    return "Please check email and enter a valid email address!";
                }
            },
            {
                type: "input",
                name: "school",
                message: "What is your intern's school?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }

                    return "Please enter at least one character!";
                }
            }
        ])
        .then(answers => {
            const intern = new Intern(
                answers.name,
                answers.id,
                answers.email,
                answers.school
            );
            //PUSHING MANAGER TO TEAM ARRAY
            employees.push(intern);
            employeeID.push(answers.id);
            createTeam();
        });
}
function buildTeam() {
    console.log(employees);
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(employees), "utf-8");
}

