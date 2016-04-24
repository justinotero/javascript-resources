function FormattedDivision(num1,num2) {
  var result = (num1/num2).toFixed(4).split('');
  var count = -1;
  for (var i = result.length - 5; i > 0; i--) {
    count++;
    if (count === 3) {
      result[i] = ',' + result[i];
      count = 0;
    }
  }
  return result.join('');
}