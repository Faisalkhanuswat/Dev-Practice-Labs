import basicTypes from "./practice/basic-types";
import { display, giveMessage } from "./practice/bind-call-apply";
import { CSDepartment, SEDepartment, Student, Teacher } from "./practice/classes";
import { factorial, fibonacci, multiple, showSum, sum } from "./practice/functions";
import { animalInfo, errors, sum2Nums, User, user } from "./practice/interfaces";
import object from "./practice/object";
import typeInference from "./practice/type-inference";
import showBanner from "./prettier/banner";

showBanner('TypeScript>>>', 'green')

basicTypes;
typeInference;
object

// functions
const res = sum(5, 6);
showSum(res);

multiple(5, 10, (num, count, result) => {
    console.log('%s x %s = %s', num, count, result);
})

factorial(5, (res, num) => {
    return console.log('The factorial of %s is %', num, res)
})

fibonacci(4, 50, (seq) => {
    console.log("\nThe fibonacci sequence is below\n", seq.join(', '))
})

// call-bind-apply
display.call(giveMessage, "Rahim");
display.apply(giveMessage, ["Rahimaaaaaaaaaaaaaaaa"]);
const print = display.bind(giveMessage)
// setTimeout(() => print("Rahimaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa yaw pera byaa"), 4000)


// Classes
// const result = new Department('Faisal', 22);
// // access directly
// // result.#name = "fdsf";

// // with setter
// result.name = "Khan";
// result.name
// result.display()

const s = new Student('1', 'IT', "1", "Faisal", "206139");
const s1 = new Student('1', 'IT', "2", "Khan", "206140");

const t = new Teacher('1', 'IT', "1", "Faisal");

s.ShowStudent;
s1.ShowStudent;

t.ShowTeacher;


// abstract class
const dpt = new CSDepartment('IT');
dpt.showName()
// Private Constructor with static method
SEDepartment.getInstance()


// Iterfaces

console.log(user)
const u = new User('Faial Khan', "Mingora", new Date("2022-08-05"), 22);
u.showInfo();

console.log(sum2Nums(4, 8));


// Type Guard

animalInfo({ type: "bird", flyingSpeed: 5000 })
animalInfo({ type: "horse", runningSpeed: 300 })

// Index Type

console.table(errors)

import "./practice/generics";