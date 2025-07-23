interface Person {
    name: string;
    address: string;
    dob: Date;
    age: Number,
    status?: string // optional
}

interface Add {
    (num1: number, num2: number): number
}

export const user: Person = {
    name: "Faisal Khan",
    address: "Mingora",
    dob: new Date("2002-08-05"),
    age: 22,
    status: 'Un Married'
}


export class User implements Person {
    name: string;
    address: string;
    dob: Date;
    age: Number;

    constructor(name: string, address: string, dob: Date, age: Number) {
        this.name = name;
        this.address = address;
        this.dob = dob;
        this.age = age
    }

    showInfo() {
        console.log("Name: %s\nAddress: %s\nDOB: %s\nAge: %s", this.name, this.address, new Date(this.dob).toLocaleDateString(), this.age);
    }
}

export const sum2Nums: Add = (num1: number, num2: number) => {
    return num1 + num2
}


// Type Guard

interface Bird {
    type: 'bird',
    flyingSpeed: number
}

interface Horse {
    type: 'horse',
    runningSpeed: number
}

type Animal = Bird | Horse;

export function animalInfo(animal: Animal): void {
    let msg: string;
    switch (animal.type) {
        case "bird":
            msg = 'Bird Flying speed is ' + animal.flyingSpeed;
            break
        case "horse":
            msg = 'Horse Running speed is ' + animal.runningSpeed;
    }

    return console.log(msg)
}


// Unknown How many Keys are in object So take index type
interface Errors {
    [props: string]: string
}

export const errors: Errors = {
    name: "Must be Start with Capital Letter.",
    email: "Must have email type.",
    username: "Not Include spaces.",
    password: "Must be 6 characters long."
}
