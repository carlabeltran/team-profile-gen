const Employee = require('./employee')

class Engineer extends Employee {
    constructor(engineer) {
        super(engineer);
        this.title = "Engineer";
        this.gitHub = engineer.gitHub;
    }
}

module.exports = Engineer;