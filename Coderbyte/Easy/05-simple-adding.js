function LetterCapitalize(str) {
  var arr = str.split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].substr(0, 1).toUpperCase() + arr[i].substr(1);
  }
  return arr.join(' ');
}