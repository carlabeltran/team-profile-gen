const Employee = require("./employee");

class Manager extends Employee {

    constructor(manager) {
        super(manager);
        this.title = "Manager";
        this.officeNumber = manager.officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

}

module.exports = Manager;
