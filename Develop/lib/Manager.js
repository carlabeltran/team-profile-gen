const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, teamName, officeNumber) {
    super(name, id, email, teamName);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
