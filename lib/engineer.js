const Employee = require('./Employee')

class Engineer extends Employee {
    constructor(engineer) {
        super(engineer);
        this.role = this.engineer;
        this.gitHub = engineer.gitHub;
    }

    getGitHub() {
        return this.gitHub;
    }
}

module.exports = Engineer;