function PowersofTwo(num) {
  for (var i = 0; i < num; i++) {
    if (Math.pow(2, i) === num) {
      return true;
    }
  }
  return false;
}