function Division(num1,num2) {
  var greatest = 1;
  for (var i = 2; i <= num1; i++) {
    if (num1 % i === 0 && num2 % i === 0) {
      greatest = i;
    }
  }
  return greatest;
}