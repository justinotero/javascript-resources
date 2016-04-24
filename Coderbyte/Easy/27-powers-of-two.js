function OffLineMinimum(strArr) {
  var result = [];
  var arr = [];
  var min;
  for (var i = 0; i < strArr.length; i++) {
    if (strArr[i] !== 'E') {
      arr.push(parseInt(strArr[i]));
    }
    else {
      min = Math.min.apply(Math, arr);
      arr.splice(arr.indexOf(min), 1);
      result.push(min);
    }
  }
  return result.join(',');
}