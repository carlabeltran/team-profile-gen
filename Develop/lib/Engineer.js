const Employee = require("./Employee");

module.exports = class Engineer extends Employee {
  constructor(name, id, email, teamName, gitHub) {
    super(name, id, email, teamName);
    this.role = "Engineer";
    this.gitHub = gitHub;
    this.teamName = teamName;
  }

  getGithub() {
    return this.gitHub;
  }

  getRole() {
    return this.role;
  }
};

