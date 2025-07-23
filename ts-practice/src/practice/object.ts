import experience from "./enums";

// Object
const person: {
    name: String;
    address: String;
    dob: Date;
    skills: string[],
    experience: experience,
    bioData: [Date, Number, Boolean, String]
} = {
    name: "Khan",
    address: "Mingora",
    dob: new Date(),
    // Array
    skills: ["React", "Next", "Node/Express", "Wordpress"],
    experience: experience.Web,
    bioData: [new Date("2002-08-05"), 23, false, 'Pakistani']
}

export default console.log('\nThe object practice file\n', person)