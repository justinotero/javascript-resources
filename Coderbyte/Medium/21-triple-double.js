function TripleDouble(num1,num2) {
  num1 = num1.toString();
  num2 = num2.toString();
  var result = [];
  for (var i = 0; i < num1.length; i++) {
    if (num1[i] === num1[i+1] && num1[i+1] === num1[i+2] && num1[i+2] !== num1[i+3]) {
      result.push(num1[i]);
    }
  }
  for (var j = 0; j < num2.length; j++) {
    if (num2[j] === num2[j+1] && result.indexOf(num2[j] !== -1) && result.length) {
      return 1;
    }
  }
  return 0;
}