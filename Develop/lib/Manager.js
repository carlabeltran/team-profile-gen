const Employee = require("./Employee");

module.exports = class Manager extends Employee {
  constructor(name, id, email, teamName, officeNumber, phoneNumber) {
    super(name, id, email, teamName);
    this.role = "Manager";
    this.officeNumber = officeNumber;
    this.phoneNumber = phoneNumber;
    this.teamName = teamName;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getRole() {
    return this.role;
  }
};
