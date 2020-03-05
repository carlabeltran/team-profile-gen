const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, teamName, github) {
    super(name, id, email, teamName);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
