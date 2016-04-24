function SimpleSymbols(str) {
  var str = '=' + str + '=';
  for (i = 0; i < str.length; i++) {
    if (str[i].match(/[a-z]/i)) {
      if (str[i-1] !== '+' || str[i+1] !== '+') {
        return false;
      }
    }
  }
  return true;
}