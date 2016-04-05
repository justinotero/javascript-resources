___Declarations___

let
instead of using var, use let
let variables are scoped to the nearest block and are not hoisted
A block is any code section within curly braces, like if, else, for, while etc

function logNames(names) {
  if (names.length === 3) {
    let message = 'There are 3 names';
  } else {
    let message = 'There is not 3 names';
  }
  console.log(message);
}

using let in for loops
var is the reason behind a gotcha in for loops, in which callbacks only return the last element instead of each element
var is hoisted to the top of the function and shared across each iteration of the loop

function logNames(names) {
  for (var i in names) {
    _loadProfile(names[i], function() {
      console.log(names[i]);
    })
  }
}

loadNames(['Max', 'Bob', 'Sam']);
//Sam
//Sam
//Sam

with let theres no sharing in for loops. A new variable is created on each iteration

function logNames(names) {
  for (let i in names) {
    _loadProfile(names[i], function() {
      console.log(names[i]);
    })
  }
}

loadNames(['Max', 'Bob', 'Sam']);
//Max
//Bob
//Sam

variables declared with let can be reassigned, but cannot be redeclared within the same scope

//good
let x = 1;
x = 2;

//bad
let x = 1;
let x = 2;



const
creates read-only named constants
variables declared with const are scoped to the nearest block

a magic number (in this case 3) is a literal value without a clear meaning
Hard to tell whether both 3s serve the same purpose

function logNames(names) {
  if (names.length > 3) {
    ...
  } else {
    ...
  }

  if (someValue > 3) {
    ...
  }
}

replace magic numbers with const

function logNames(names) {
  const MAX_NAMES = 3;
  if (names.length > MAX_NAMES) {
    ...
  } else {
    ...
  }
  const MAX_NUMBER = 3;
  if (someValue > MAX_NUMBER) {
    ...
  }
}

once assigned, constants cannot be assigned a new value

const x = 1;
x = 2;
//x = 1

variables declared with const must be assigned an initial value

const x;
x = 10;
//ERROR

let vs const
use let when variables could be reassigned new values
use const when new variables are not expected to be reassigned new values



___Functions___

default parameter values help move default values from the function body to the function signature

function logNames(names = []) {
	let namesLength = names.length;
	console.log(namesLength);
}

uses empty array as default value when no argument is passed
logNames(); //0

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
	milesDriven: 100000
});

/*
bmw
red
2001
100000
*/

its ok to omit some options when invoking a function with named parameters

cars('bmw', {
  color: red,
});

/*
name: bmw
color: red
year: undefined
milesDriven: undefined
*/

its not ok to omit the options argument altogether when invoking a function with named parameters when no default value is set for them

//bad
cars('bmw'); //invoking this function without its second argument causes an error

setting a default value for the entire options argument allows this parameter to be omitted during function calls

function car(name, {color, year, milesDriven} = {}) {
	console.log(name);
	console.log(color);
	console.log(year);
	console.log(milesDriven);
}

//good
cars('bmw');

/*
name: bmw
color: undefined
year: undefined
milesDriven: undefined
*/



issues with the arguments object
variadic functions can accept any number of arguments
the arguments object is a built in, array like object that corresponds to the arguments of a function. relying on this object to read arguments is not ideal

//bad
function logNames() {
  for (let i in arguments) {
    let name = arguments[i];
    console.log(name);
  }
}

hard to tell which parameters the function expects to be called with
any changes to the function signature will break the code
if we add an argument, it'll break the loop, since index 0 of the arguments object would no longer be a name but a targetElement instead

//bad
function logNames(targetElement) {
  let target = _findElement(targetElement);
  for (let i in arguments) {
    let name = arguments[i];
    console.log(target, name);
  }
}

use rest parameters
represents an indefinite number of arguments as an array. this way, changes to function signature are less likely to break code
must always be the last parameter in a function
used in function definitions

//good
function logNames(...names) {
  for (let i in names) {
    let name = names[i];
    console.log(name);
  }
}

//good
function logNames(targetElement, ...names) {
  let target = _findElement(targetElement);
  for (let i in names) {
    let name = names[i];
    console.log(target, name);
  }
}



spread operator
split an array argument into individual elements

//bad
getName('/documents/names', function(data) {
  let names = data.names;
  displayNames(names); //names is an array ['Max', 'Bob', 'Sam'] but displayNames is a variadic function that accepts individual arguments
});

//good
getName('/documents/names', function(data) {
  let names = data.names;
  displayNames(...names); //names is now individual arguments ('Max', 'Bob', 'Sam')
});

rest parameters vs spread operator
rest parameters are used in function definitions
spread operator is used in function invocations



issues with scope in callback functions
anonymous functions passed as callbacks to other functions create their own scope

function NameComponent(targetElement, urlPath) {
  this.target = targetElement;
  this.urlPath = urlPath;
}

//bad
NameComponent.prototype.render = function() {
  getName(this.urlPath, function(data) {
    let names = data.names;
    displayNames(this.targetElement, ...names); //this.targetElement returns undefined because the scope of the NameComponent object is not the same as the scope of the anonymous function
  });
}

use arrow functions
arrow functions bind to the scope of where they are defined, not where they are used

//good
NameComponent.prototype.render = function() {
  getName(this.urlPath, (data) => {
    let names = data.names;
    displayNames(this.targetElement, ...names);
  });
}



___Objects and Strings___

object initializer
removes duplicate variable names from object properties when those properties have the same name as the variables being assigned to them

//bad
function createName(first, last) {
  let fullName = first + ' ' + last;
  return {first: first, last: last, fullName: fullName};
}

//good
function createName(first, last) {
  let fullName = first + ' ' + last;
  return {first, last, fullName};
}

works anywhere a new object is returned, not just from functions

let name = 'Bob';
let age = 20;

let person = {name, age};

console.log(person.name); //Bob
console.log(person.age); //20



object destructuring
use shorthand to assign properties from objects to local variables with the same name

//bad
let person = createName('Bob', 'Smith');

let first = user.first;
let last = user.last;
let fullName = user.fullName;

//good
let {first, last, fullName} = createName('Bob', 'Smith');

console.log(first); //Bob
console.log(last); //Smith
console.log(fullName); //Bob Smith

not all properties have to be destructured all the time. we can explicitly select the ones we want

let {fullName} = createName('Bob', 'Smith');

console.log(fullName); //Bob Smith

object initializer vs object destructuring
use object initializer to assign from variables to object properties
use object destructuring to assign from object properties to variables



adding a function to an object
the keyword function is no longer necessary

//bad
function createName(first, last, gender) {
  let fullName = first + ' ' + last;
  return {
    first,
    last,
    fullName,
    isMale: function() {
      return gender === 'male';
    }
  }
}

//good
function createName(first, last, gender) {
  let fullName = first + ' ' + last;
  return {
    first,
    last,
    fullName,
    isMale() {
      return gender === 'male';
    }
  }
}



template strings
are string literals that allow embedded expressions, providing a better way to do string interpolation
instead of appending strings using +, wrap the entire text with backticks `` not quotes ''. any javascript that needs to be evaluated inside that text is wrapped in ${}

//bad
function createName(first, last) {
  let fullName = first + ' ' + last;
}

//good
function createName(first, last) {
  let fullName = `${first} ${last}`;
}

template strings offer a better way to write multiline strings

let name = 'Bob';
let person = {fullName: 'Sam Smith'};

let paragraph = `hello ${bob},

this is a
paragraph

and random
words.

sincerely,
  ${person.fullName}
`;

console.log(paragraph);

/*
hello ${bob},

this is a
paragraph

and random
words.

sincerely,
  ${person.fullName}
*/



object.assign
for functions that need to be used across different applications, accept an options object instead of using named parameters

//bad
function countdownTimer(target, timeLeft, {container, timeUnit, clonedDataAttribute, timeoutClass, timeoutTime} = {}) {
  ...
}

//good
function countdownTimer(target, timeLeft, options = {}) {
  ...
}

some options might not be specified by the caller, so we need to have default values
dont use local values and || for defaults

//bad
function countdownTimer(target, timeLeft, options = {}) {
  let container = options.container || '.timer-display';
  let timeUnit = options.timeUnit || 'seconds';
  let clonedDataAttribute = options.clonedDataAttribute || 'cloned';
  let timeoutClass = options.timeoutClass || '.is-timeout-soon';
  let timeoutTime = options.timeoutTime || '10';
}

use a local object to group defaults

//good
function countdownTimer(target, timeLeft, options = {}) {
  let defaults = {
    container: '.timer-display',
    timeUnit: 'seconds',
    clonedDataAttribute: 'cloned',
    timeoutClass: '.is-timeout-soon',
    timeoutTime: '10',
  };
}

object.assign copies properties from one or more source objects to a target object specified as the very first argument

function countdownTimer(target, timeLeft, options = {}) {
  let defaults = {
    ...
  };
  let settings = Object.assign({}, defaults, options);
}

in the case of duplicate properties on source objects, the value from the last object on the chain always prevails

function countdownTimer(target, timeLeft, options = {}) {
  let defaults = {
    ...
  };
  let settings = Object.assign({}, defaults, options, options2, options3); //duplicate properties from options3 override those on options2 etc.
}

countdownTimer($('button'), 60, {container: '.new-post-options'});

console.log(settings.container); //.new-post-options
console.log(settings.timeUnit); //seconds