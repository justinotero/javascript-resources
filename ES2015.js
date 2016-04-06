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

with let theres no sharing in for loops. a new variable is created on each iteration

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
Hard to tell whether both 3 serve the same purpose

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



___Arrays___

dont access array elements by their index to assign to local variables

let names = ['Max', 'Bob', 'Sam'];

//bad
let a = names[0];
let b = names[1];
let c = names[2];

use array destructuring

//good
let [a, b, c] = names;

values can be discarded

let [a, , b] = names;

console.log(a, b); //Max Sam

combine array destructuring with rest parameters to group values into other arrays

let [first, ...rest] = names;

console.log(first, rest); //Max ['Bob','Sam'];



for of
iterates over property values
better way to loop over arrays and other iterable objects

let names = ['Max', 'Bob', 'Sam'];

//bad
for (let index in names) {
  console.log(names[index]); //Max Bob Sam
}

//good
for (let element of names) {
  console.log(element); //Max Bob Sam
}

cannot use for of on objects

let age = {Max: 20, Bob: 15, Sam: 10};

for (let element of age) {
  console.log(element); //ERROR
}

in order to use for of on objects, the object needs a special function assigned to the Symbol.iterator property

//can use for of
console.log(typeof names[Symbol.iterator]); //function

//cannot use for of
console.log(typeof age[Symbol.iterator]); //undefined



Array.find
returns the first element in the array that satisfies a provided testing function

let namesAge = [
  {name: 'Max', age: 20},
  {name: 'Bob', age: 15},
  {name: 'Sam', age: 10}
];

let youngAge = namesAge.find(element => element.age <= 10);
console.log(youngAge); //{name: 'Sam', age: 10}



___Maps___

a data structure composed of a collection of key/value pairs

issues with using objects as maps
its keys are always converted to strings

let name1 = {name: 'Max'};
let name2 = {name: 'Bob'};

let age = {};
age[name1] = 20;
age[name2] = 15;

console.log(age[name1]); //15
console.log(age[name2]); //15

the last value assigned overrides all the previous values because both objects are converted to the string '[object Object]'
if we ask for the total list of keys in the age object using Object.keys, there is an array with only one element

console.log(Object.keys(age)); //['object Object']

use Map
a simple key/value data structure
any value may be used as either a key or a value, and objects are not converted to strings

let name1 = {name: 'Max'};
let name2 = {name: 'Bob'};

let age = new Map();
age.set(name1, 20);
age.set(name2, 15);

console.log(age.get(name1)); //20
console.log(age.get(name2)); //15

maps are iterable, so they can be used in a for of loop
each run of the loop returns a [key, value] pair for an entry in the map

let mapNames = new Map();

mapNames.set('name', 'Max');
mapNames.set('name', 'Bob');
mapNames.set('name', 'Sam');

for (let [key, value] of mapNames) {
  console.log(`${key} = ${value}`);
}

/*
name = Max
name = Bob
name = Sam
*/



WeakMap
a type of map where only objects can be passed as keys
primitive data types such as strings, numbers, booleans etc are not allowed
weakmaps are not iterable, they cannot be used in a for of loop

let name = {};
let age = {};

let nameAge = new WeakMap();
nameAge.set(name, 'name');
nameAge.set(age, 'age');

console.log(nameAge.get(name)); //name
console.log(nameAge.get(age)); //age

nameAge.set('Max', 'Smith'); //ERROR

all methods on a weakmap require access to an object used as a key

console.log(nameAge.get(name)); //name
console.log(nameAge.has(name)); //true
console.log(nameAge.delete(name)); //true

weakmaps are memory efficient
individual entries in a weakmap can be garbage collected while the weakmap itself still exists
weakmaps dont prevent the garbage collector from collecting objects currently used as keys, but that are no longer referenced anywhere else in the system

let name = {}; //all objects occupy memory space

let nameAge = new WeakMap();
nameAge.set(name, 'age'); //object reference passed as key to the weakmap

someOtherFunction(name); //once it returns, name can be garbage collected



___Sets___

the set object stores unique values of any type, whether primitive values or object references

let names = new Set();

names.add('Max');
names.add({name: 'Bob'});
names.add('Max'); //duplicate entries are ignored

console.log(names.size) //2

set objects are iterable, they can be used in a for of loop and destructuring

for (let element of names) {
  console.log(element);
}

/*
Max
{name: 'Bob'}
*/

let [a, b] = names;
console.log(a, b) //Max {name: 'Bob'}



WeakSet
a type of set where only objects are allowed to be stored
weaksets cannot be used in a for of loop, and they offer no methods for reading values from it

let names = new WeakSet();

names.add('Max'); //ERROR
let bob = {name: 'Bob'};
names.add(bob);

names.has(bob); //true
names.delete(bob); //true



___Class___

using a function approach
a common approach to encapsulation in javascript is using a constructor function

function People(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
}

People.prototype.whatGender = function() {
  ...
}

let person = new People('Max', 20, 'male');
person.whatGender();

use classes

class People {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  whatGender() {
    ...
  }
}

let person = new People('Max', 20, 'male');
person.whatGender();

instance variables set on the constructor method can be accessed from all other instance methods in the class

class People {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  whatGender() {
    let maleOrFemale = this._findGender(this.gender);
  }

  _findGender(gender) {  //prefixing a method with an underscore is a convention for indicating that it should not be invoked from the public API
    ...
  }
}

use extends
creates a class that inherits methods and properties from another class. the super method runs the constructor function from the parent class

class Teenager extends People {
  constructor(name, age, gender, school, grade) {
    super(name, age, gender);
    this.school = school;
    this.grade = grade;
  }

  whatGender() {
    let genderType = super.whatGender(); //child classes can invoke methods from their parent classes via the super object
    return `Gender is: ${this.gender}`;
  }
}



___Promises___

synchronous style functions wait for return values

//bad
let name = getName('bob'); //page freezes until a value is returned from this function
profile.render(name);

avoid blocking the main thread of execution by writing nonblocking code
asynchronous style functions pass callbacks

//good
getName('bob', function(name) {
  profile.render(name);
});

use Promise
abstraction that allows writing async code in an easier way

the promise constructor function takes an anonymous function with 2 callback arguments known as handlers

function getName(name) {
  return new Promise(function(resolve, reject) {
    ...
    resolve(someValue); //called when the nonblocking code is done executing
    ...
    reject(someValue); //called when an error occurs
  });
};

a Promise represents a future value, such as the eventual result of an asynchronous operation
use the then() method to read results from the Promise once its resolved. this method takes a function that will only be invoked once the Promise is resolved

getName('bob').then(function(name) {
  profile.render(name);
});

then() can also be chained multiple times. the return value from one call is passed as argument to the next

getName('bob').then(function(nameList) {
  return nameList.filter((element) => element ==='bob');
  }).then(function(name) {
    profile.render(name);
  });

use the catch() method for when the Promise is moved to a rejected state. none of the remaining then() functions are invoked

getName('bob').then(function(nameList) {
  return nameList.filter((element) => element ==='bob');
  }).then(function(name) {
    profile.render(name);
  }).catch(function(error) {
    console.log(error);
  });

passing function arguments to then(), instead of using anonymous functions

function filterName(nameList) {...}

let profile = {
  render(filterName) {...}
};

getName('bob')
  .then(filterName)
  .then(profile.render)
  .catch(function(error) {
    console.log(error);
  });