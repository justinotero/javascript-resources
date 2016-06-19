function DistinctList(arr) {
  var map = {};
  var greatest = 0;
  for (var i = 0; i < arr.length; i++) {
    if (map[arr[i]] === undefined) {
      map[arr[i]] = 1;
    } else {
      map[arr[i]]++;
    }
  }
  for (var key in map) {
    if (map[key] > greatest) {
      greatest = map[key];
    }
  }
  return greatest > 1 ? greatest - 1 : 0;
}