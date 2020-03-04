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
const outputPath = path.join(OUTPUT_DIR, "team.html");
//////////////////////////////////////////////////////////////////
//
const render = require("./lib/htmlRenderer");
////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//TEAM EMPTY ARRAY
const team = [];

const employeeID = [];

//////////////////////////////////////////////////////////////////

function newApp() {
    function buildManagerProfile() {
        console.log("Team work makes the dream work. Lets get to it!");
        inquirer.prompt([
            {
                type: "input",
                name: "teamName",
                message: "Please enter team name: "
            },
            {
                type: "input",
                name: "managerName",
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
                name: "managerId",
                message: "Please enter manager's id:",
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
                name: "managersEmail",
                message: "Please enter mangers email:",
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
                name: "managerOfficeNumber",
                message: "Please enter manager's office number:",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }

                    return "Please enter a number greater than zero!";
                }
            },
        ]).then(answers => {
            const manager = new Manager(
                answers.teamName,
                answers.managerName,
                answers.managerId,
                answers.managersEmail,
                answers.managerOfficeNumber,
            )
            //PUSHING MANAGER TO TEAM ARRAY
            team.push(manager);
            employeeID.push(answers.managerId);
            createTeam();
        })

    }

    function createTeam() {

        inquirer.prompt([
            {
                type: "list",
                name: "selectTeam",
                message: "Select the type of employee you will require to build your dream team.",
                choices:
                    [
                        'Engineer',
                        'Intern',
                        'Exit',
                    ]
            },
        ]).then(userSelectedData => {
            switch (userSelectedData.selectTeam) {
                case 'Engineer':
                    addEngineer();
                    break;
                case 'Intern':
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    function addEngineer() {
        console.log('');
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "engineerName",
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
                    name: "engineerId",
                    message: "What is your engineer's id:",
                    validate: answer => {
                        const pass = answer.match(/^[1-9]\d*$/);
                        if (pass) {
                            if (employeeID.includes(answer)) {
                                return 'This ID is already taken.Please enter another ID.'
                            } else {
                                return true;

                            }
                        }

                        return "Please enter a number greater than zero!";
                    }

                },
                {
                    type: "input",
                    name: "engineerEmail",
                    message: "Whats is your engineer's email:",
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
                    name: "engineerGitHub",
                    message: "What is your engineer's GitHub username:",
                    validate: answer => {
                        if (answer !== '') {
                            return true;
                        }

                        return "Please enter at least one character!";
                    }
                }
            ]).then(answers => {
                const engineer = new Engineer(
                    answers.engineerName,
                    answers.engineerId,
                    answers.engineerEmail,
                    answers.engineerGitHub,
                );
                //PUSHING MANAGER TO TEAM ARRAY
                team.push(engineer);
                employeeID.push(answers.engineerId);
                createTeam();
            });
    }

    function addIntern() {
        console.log("");
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "engineerName",
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
                    name: "engineerId",
                    message: "What is your engineer's id:",
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
                    name: "engineerEmail",
                    message: "Whats is your engineer's email:",
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
                    name: "engineerGitHub",
                    message: "What is your engineer's GitHub username:",
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
                    answers.internName,
                    answers.internId,
                    answers.internEmail,
                    answers.internSchoolName
                );
                //PUSHING MANAGER TO TEAM ARRAY
                team.push(intern);
                employeeID.push(answers.internId);
                createTeam();
            });
    }

    function buildTeam() {
        if (!fs.exsistsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(team), 'utf-8');
    }

    buildManagerProfile();

}
newApp();
