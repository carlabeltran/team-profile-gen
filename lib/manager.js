const Employee = require("./Employee");

class Manager extends Employee {

    constructor(teamName,name, id, email, officeNumber) {
        super(name, id, email);
        this.teamName = teamName;
        this.officeNumber = officeNumber;
    }

    getRole() {
        return 'Manager';
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getTeamName() {
        return this.teamName;
    }
    
}

module.exports = Manager;
