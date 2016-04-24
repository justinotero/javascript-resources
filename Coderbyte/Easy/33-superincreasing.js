function Superincreasing(arr) {
  var sum = 0
  for (var i = 0; i < arr.length; i++) {
    if (sum >= arr[i]) {
      return false;
    }
    sum += arr[i];
  }
  return true;
}