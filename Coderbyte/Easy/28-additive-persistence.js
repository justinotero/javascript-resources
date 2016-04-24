function AdditivePersistence(num) {
  num = num.toString();
  var sum = 0;
  for (var i = 0; i < num.length; i++) {
    sum += parseInt(num[i]);
  }
  return num > 9 ? 1 + AdditivePersistence(sum) : 0;
}