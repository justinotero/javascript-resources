function SimpleMode(arr) {
  var map = {};
  var count = 0;
  var mode;
  for (var i = 0; i < arr.length; i++) {
    if (!map[arr[i]]) {
      map[arr[i]] = 1;
    } else {
    map[arr[i]]++;
    }
    if (map[arr[i]] > count) {
      count = map[arr[i]];
      mode = arr[i];
    }
  }
  return count > 1 ? mode : -1;
}