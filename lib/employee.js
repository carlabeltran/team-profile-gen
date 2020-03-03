class Employee {

    constructor(employee) {
        this.id    =  employee.id;
        this.name  =  employee.name;
        this.email =  employee.email;
        this.title = employee.role;

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
        return this.title;
    }

}

module.exports = Employee;