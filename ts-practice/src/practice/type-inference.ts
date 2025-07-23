// custom Types
type Age = string | Date

type Car = {
    company: string;
    model: string;
}

type Turbo = {
    isTurbo: boolean;
    isRearEngine: boolean;
}

type TurboCar = Car & Turbo;

// Type Inference
let cgpa: number;
let level: string;
let age: Age



cgpa = 3.2;
level = "BS"

age = '05-Aug-2002';


const Porsche: TurboCar = {
    company: "Porsche",
    model: "911",
    isTurbo: false,
    isRearEngine: true
}

console.log("_____________________________________________________________\n" +
    "|                                                           |\n" +
    "|               -----------------------------               |\n" +
    "|               |    Details of Porsche     |               |\n" +
    "|               -----------------------------               |\n" +
    "|                                                           |\n" +
    "|                 Company:        %s                   |\n" +
    "|                 Model:          %s                       |\n" +
    "|                 Turbu:          %s                        |\n" +
    "|                 Rear Engine:    %s                       |\n" +
    "|                                                           |\n" +
    "|___________________________________________________________|", Porsche.company, Porsche.model, Porsche.isTurbo ? "Yes" : "No", Porsche.isRearEngine ? "Yes" : "No")

export default console.log('\nType Inference practice file\n CGPA: %s\nEductaion Level: %s\nAge: %s', cgpa, level, age);


// Nullish Coalescing
const a = "";

// this will show Fallback because the empty is also falsy value
const b = a || 'Fallback';
console.log(b)

// I want to keep empty string as truty but null or undefined is a falsy
const c = a ?? b; // This is called Nullish Coalescing
// This will show emtpy string because this not null not undefined
console.log(c);