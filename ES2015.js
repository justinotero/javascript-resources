let
instead of using var, use let
let variables are scoped to the neartest block and are not hoisted

Using let in for loops
var is the reason behind a gotcha in for loops, in which callbacks only return the last element instead of each element
variables declared with let can be reassigned, but cannot be redeclared within the same scope

OK
let x = 'Hello';
x = 'Goodbye';

ERROR
let x = 'Hello';
let x = 'Goodbye';

const
creates read-only named constants
variables declared with const are scoped to the nearest block
once assigned, constants cannot be assigned a new value

ERROR
const x = 1;
x = 2;

let vs const
use let when variables could be reassigned new values
use const when new variables are not expected to be reassigned new values


functions
default parameter values help move default values from the function body to the function signature

function message(names = []) {
	let namesLength = names.length;
	console.log(namesLength);
}

uses empty array as default value when no argument is passed
message(); //0

named parameters
using named parameters for optional settings makes it easier to understand how a function should be invoked

function car(name, {color, year, milesDriven}) {
	console.log(name);
	console.log(color);
	console.log(year);
	console.log(milesDriven);
}

car('bmw', {
	color: red,
	year: 2001;
	milesDriven: 100,000
});

its ok to omit some options when invoking a function with named parameters
its not ok to omit the options argument altogether when invoking a function with named parameters when no default value is set for them
setting a default value for the entire options argument allows this parameter to be omitted during function calls

function car(name, {color, year, milesDriven} = {}) {
	console.log(name);
	console.log(color);
	console.log(year);
	console.log(milesDriven);
}

OK
cars('bmw');
/*
name: bmw
color: undefined
year: undefined
milesDriven: undefined
*/


rest parameters
allows us to represent an indefinite number of arguments as an array. this way, changes to function signature are less likely to break code
must always be the last parameter in a function
used in function definitions

function message(...words) {
	for(let i in words) {
	let word = words[i];
	console.log(word);
	}
}


spread operator
split an array argument into individual elements
used in function invocations

getName('x', function(person) {
	let names = person.names;
	displayNames(...names);
});


arrow function
arrow functions bind to the scope of where they are defined, not where they are used