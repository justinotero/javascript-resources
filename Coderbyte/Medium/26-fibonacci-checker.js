function FibonacciChecker(num) {
  var arr = [0, 1];
  for (var i = 2; i < num; i++) {
    arr.push(arr[i-1] + arr[i-2]);
  }
  return arr.indexOf(num) !== -1 ? 'yes' : 'no';
}