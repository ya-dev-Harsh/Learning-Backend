// Initiating npm use command :- npm init

// To download any package command :- npm install <something>

//var generateName = require("sillyname")
import generateName from 'sillyname'
import superheroes, { randomSuperhero } from 'superheroes'

var sillyName = generateName();
var superheroName = randomSuperhero()

console.log(`My name is ${sillyName}.`);
console.log(`My name is ${superheroName}.`);

