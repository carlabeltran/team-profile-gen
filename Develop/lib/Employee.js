module.exports = class Employee {
  constructor(name, id, email, teamName) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.teamName = teamName;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return "Employee";
  }
  getTeamName() {
    return this.teamName;
  }
};



