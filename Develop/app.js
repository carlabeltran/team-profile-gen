//COLLECTS USER DATA
const inquirer = require("inquirer");
//WE ARE ESTABLISHING THE ABSOLUTE PATH
const path = require("path");
//FILE SYSTEM
const fs = require("fs");
////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
//CLASS MANAGER
const Manager = require("./lib/Manager");
//CLASS ENGINEER
const Engineer = require("./lib/Engineer");
//CLASS INTERN
const Intern = require("./lib/Intern");
//
const render = require("./lib/htmlRenderer");
////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
//
const config = require("./package.json");
////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
//CREATING A PATH TO THE ASSETS FOLDER
const ASSET_DIR = path.resolve(__dirname, "assets");
//​CREATING A OUTPUT FOLDER
const OUTPUT_DIR = path.resolve(__dirname, "output");
//CREATING A PATH TO THE OUTPUT FOLDER
const outputPath = path.join(OUTPUT_DIR, "./output/team.html");
//CREATING PATH TO THE CSS FILE IN THE ASSESTS FOLDER 
const cssPath = path.join(ASSET_DIR, "style.css");
///CREATING PATH TO THE CSS FILE IN THE OUTPUT FOLDER 
const cssOutputPath = path.join(OUTPUT_DIR, "style.css");
////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
const employees = [];
const output = [];
//////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
//
console.log(`Welcome to ${config.name} ${config.version}`)
////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
//CHECK AND CREATE OUTPUT DIRECTORY
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}
//////////////////////////////////////////////////////////////////


function welcome() {
    console.log("Team work makes the dream work! Let's start building your team!");
    inquirer
        .prompt([
            {
                type: "input",
                name: "teamName",
                message: "What the team's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character!";
                }
            },
        ])
        .then(teamNameData => {
            const teamName = teamNameData.teamName;
            console.log(`Hello ${teamName} team!`);
            employees.push(teamNameData);
            ask();
        });
}

////////////////////////////////////////////////////////////////
//MAIN QUESTION CONTAINS EMPLOYEE TYPE (ROLE)
const mainQuestions = [
    {
        type: 'list',
        name: 'role',
        message: "Select employee type:",
        choices: [
            'Manager',
            'Engineer',
            'Intern'
        ],
        filter: function (val) {
            return val.toLowerCase();
        }
    },
];
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//BASE QUESTION CONTAINS EMPLOYEE (NAME, ID, & EMAIL)
const baseQuestion = [
    {
        type: "input",
        name: "name",
        message: "Whats the employee's name:",
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
        message: "What's the employee's ID:",
                validate: function (answer) {
                    const valid = !isNaN(parseFloat(answer));
                    return valid || "Please enter a number";
                },
                filter: Number
    },
    {
        type: "input",
        name: "email",
        message: "What's the employee's e-mail address?",
        validate: answers => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(answers) ? true : "Please enter a valid e-mail address."
    },

];
////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
//MANAGER QUESTION CONTAINS OFFICE NUMBER & OFFICE PHONE NUMBER
function addManager() {
    console.log("Leaders need to provide strategy and direction and to give employees the tools that enable them to gather information and insight from around the world. Leaders shouldn’t try to make every decision -Bill Gates, founder of Microsoft");
    inquirer
        .prompt([
            ...baseQuestion,
            {
                type: "input",
                name: "officeNumber",
                message: "What's the manager's office number:",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }

                    return "Please enter a valid room number.";
                },
            },
            {
                type: "input",
                name: "phoneNumber",
                message: "What's the manager's phone number?",
                validate: answer => {
                    const pass = answer.match(/^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid phone number!";
                }
            },
            {
                type: "confirm",
                name: "addEmployee",
                message: "Do you want to add another employee?",
                default: true
            },

        ]).then(function(answers) {
            if (answers.addEmployee === true) {
                
                ask()
            } else {
                output.push(answers);
            }
        })

};
////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
//ENGINEER QUESTION CONTAINS GIT HUB USER NAME
function addEngineer() {
    console.log(
        "The engineer has been, and is, a maker of history.— James Kip Finch, American engineer and educator"
    )
    inquirer
        .prompt([
            ...baseQuestion,
            {
                type: "input",
                name: "gitHubUser",
                message: "What the engineer's gitHub username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }

                    return "Please enter at least one character!";
                }
            },
            {
                type: "confirm",
                name: "addEmployee",
                message: "Do you want to add another employee?",
                default: true
            },
        ]).then(function(answers) {
            if (answers.addEmployee === true) {
                
                ask()
            } else {
                output.push(answers);
            }
        })
};
//THIS FUNCTION ADDS INTERN
function addIntern() {
    console.log("Put your heart, mind, and soul into even your smallest acts. This is the secret of success.-Swami Sivananda"
);
    inquirer
        .prompt([
            ...baseQuestion,
            {
                type: "input",
                name: "school",
                message: "What school does the intern attend?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }

                    return "Please enter at least one character!";
                }
            },
            {
                type: "confirm",
                name: "addEmployee",
                message: "Do you want to add another employee?",
                default: true
            },
        ]).then(function(answers) {
            if (answers.addEmployee === true) {
                
                ask()
            } else {
                output.push(answers);
            }
        })
};

function ask(question) {
    if (question === undefined) question = mainQuestions;
    inquirer.prompt(question).then(answers => {
        console.log(answers)
        if (answers.addEmployee === undefined) {
            switch (answers.role) {
                case "manager":
                    console.log("Manager data:");
                    addManager()
                    break;
                case "engineer":
                    console.log("Engineer data:");
                    addEngineer()
                    break;
                case "intern":
                    console.log("Intern data:");
                    addIntern()
                    break;
                default:
                    ask(question);
            }
        } else {
            if (question === addManager()) {
                answers.role = "manager";
            } else if (question === addEngineer()) {
                answers.role = "engineer";
            } else if (question === addIntern()) {
                answers.role = "intern";
            }

            output.push(answers);
            if (answers.addEmployee) {
                ask(question);
            } else {
                const employees = output.map(emp => {
                    switch (emp.role) {
                        case "manager":
                            return new Manager(emp.name, emp.id, emp.email, emp.officeNumber, emp.teamName, emp.phoneNumber);
                        case "engineer":
                            return new Engineer(emp.name, emp.id, emp.email, emp.github, emp.teamName);
                        case "intern":
                            return new Intern(emp.name, emp.id, emp.email, emp.teamName, emp.school);
                    }
                });
                const html = render(employees);

                fs.writeFileSync(outputPath, html, "utf-8", function (err) {
                    if (err) {
                        throw err;
                    } else {
                        
                        fs.writeFile(__dirname + '/output/team.html', html, 'utf-8', function (err) {
                            if (err) {
                                throw err;
                            }
                            console.log('file success!');
                    
                        });


                        fs.createReadStream(cssPath).pipe(fs.createWriteStream(cssOutputPath));
                    };
                });
    
            };
        };
    });
};


welcome();