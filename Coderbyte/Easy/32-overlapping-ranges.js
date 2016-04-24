function OverlappingRanges(arr) {
  var count = arr[4];
  for (var i = arr[0]; i <= arr[1]; i++) {
    for (var j = arr[2]; j <= arr[3]; j++) {
      if (i === j) {
        count--;
      }
    }
  }
  return count <= 0;
}