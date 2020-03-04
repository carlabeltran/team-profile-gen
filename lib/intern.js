const Employee = require("./Employee");

class Intern extends Employee {

    constructor(intern) {
        super(intern);
        this.role = this.intern;
        this.school = intern.school;
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;
