function ArrayAdditionI(arr) {
  var max = arr.sort(function(a,b) {return a - b;}).pop();
  var result = 0
  while (result !== max) {
    for (i = 0; i < arr.length; i++) {
      result += arr[i];
    }
  break;
  }
  return result === max;
}