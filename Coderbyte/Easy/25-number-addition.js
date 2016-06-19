function NumberAddition(str) {
  return str.match(/[0-9]+/g).reduce(function(a,b) {return parseInt(a) + parseInt(b);});
}