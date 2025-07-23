import exp from "constants";

class Department {
    id: String;
    name: String;

    constructor(id: String, name: String) {
        this.id = id;
        this.name = name;
    }

    get ShowDept() {
        return console.log("The Dept is " + this.name);
    }
}


export class Student extends Department {
    constructor(deptId: String, deptName: string, public sid: String, public sname: String, public rollno: String) {
        super(deptId, deptName);
    }

    get ShowStudent() {
        const s = { dId: this.id, dName: this.name, sId: this.sid, sName: this.sname, rollno: this.rollno }
        return console.log(s);
    }
}

export class Teacher extends Department {
    constructor(dId: string, dName: string, public tId: String, public tName: String) {
        super(dId, dName);
    }

    get ShowTeacher() {
        const t = { tId: this.tId, tName: this.tName, dId: this.id, dName: this.name }
        return console.log(t);
    }
}


// Abstract Class
abstract class ITDepartment {
    protected name: String;

    constructor(n: string) {
        this.name = n;
    }

    abstract showName(): void;
}

export class CSDepartment extends ITDepartment {
    private n = 'Computer Science';
    constructor(name: string) {
        super(name);
    }
    // concrete implementation of overriding method on parent
    showName(): void {
        console.log(this.n + " is also include in " + this.name + " department.");
    }
}

export class SEDepartment extends ITDepartment {
    private n = 'Software Engineering';
    private static instance: void;

    private constructor(name: string) {
        super(name);
    }

    showName(): void {
        console.log(this.n + " also a part of " + this.name + " department.");
    }

    static getInstance() {
        this.instance = new SEDepartment('IT').showName();
        return this.instance;
    }
}