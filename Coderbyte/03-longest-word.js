function SecondGreatLow(arr) {
  var unique = []
  for (i = 0; i < arr.length; i++) {
    if (unique.indexOf(arr[i]) === -1) {
      unique.push(arr[i]);
    }
}
  var arr = unique.sort(function(a,b) {return a-b;});
  return arr[1] + ' ' + arr[arr.length - 2];
}