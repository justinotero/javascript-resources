function LetterChanges(str) {
  var result = str.replace(/[a-z]/gi, function (a) {return String.fromCharCode(a.charCodeAt() + 1);});
  return result.replace(/[aeiou]/gi, function (a) {return a.toUpperCase();});
}