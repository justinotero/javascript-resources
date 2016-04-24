function MultiplicativePersistence(num) {
  num = num.toString();
  var sum = 1;
  for (var i = 0; i < num.length; i++) {
    sum *= num[i];
  }
  return num > 9 ? 1 + MultiplicativePersistence(sum) : 0;
}