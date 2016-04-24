function Consecutive(arr) {
  arr = arr.sort(function(a, b) {return a - b;});
  var diff = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i+1] - arr[i] !== 1 && typeof arr[i+1] === 'number') {
      diff += arr[i+1] - arr[i] - 1;
    }
  }
  return diff;
}