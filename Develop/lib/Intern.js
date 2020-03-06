const Employee = require("./Employee");

module.exports = class Intern extends Employee {
  constructor(name, id, email, teamName, school) {
    super(name, id, email, teamName);
    this.role = "Intern";
    this.school = school;
    this.teamName = teamName;
  }

  getSchool() {
    return this.school;
  }
  getRole() {
    return this.role;
  }

};

