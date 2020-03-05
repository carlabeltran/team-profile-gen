const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, teamName, school) {
    super(name, id, email, teamName);
    this.school = school;
  }

  getSchool() {
    return this.school;
  }
  getRole() {
    return "Intern";
}

}

module.exports = Intern;
