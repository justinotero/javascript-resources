function HammingDistance(strArr) {
  var count = 0;
  for (var i = 0; i < strArr[0].length; i++) {
    if (strArr[0][i] !== strArr[1][i]) {
      count++;
    }
  }
  return count;
}