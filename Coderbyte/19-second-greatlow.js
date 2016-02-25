function DivisionStringified(num1,num2) {
  var result = Math.round(num1/num2);
  result = result.toString().split('');
  count = 0;
  if (result.length > 3) {
    for (var i = 0; i < result.length; i++) {
      count++;
      if (count === 3) {
        result[i] = ',' + result[i];
        count = 0;
      }
    }
  }
  return result.join('');
}