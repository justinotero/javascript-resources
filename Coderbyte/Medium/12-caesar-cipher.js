function CaesarCipher(str,num) {
  var result = '';
  var x;
  for (var i = 0; i < str.length; i++) {
    if (!/^[a-zA-Z]+$/.test(str[i])) {
      x = str[i];
      result += x;
    } else {
      x = str[i].charCodeAt() + num;
      result += String.fromCharCode(x);
    }
  }
  return result;
}