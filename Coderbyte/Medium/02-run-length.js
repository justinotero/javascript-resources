function RunLength(str) {
  var arr = str.split('');
  var results = [];
  var count = 1;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i+1]) {
      count++
    } else {
      results.push(count);
      results.push(arr[i]);
      count = 1;
    }
  }
  return results.join('');
}