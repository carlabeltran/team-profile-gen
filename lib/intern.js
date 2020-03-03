const Employee = require("./employee");

class Intern extends Employee {

    constructor(intern) {
        super(intern);
        this.title = "Intern";
        this.school = school;
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;
