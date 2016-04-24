function ExOh(str) {
  var x = str.split('x');
  var o = str.split('o');
  return x.length === o.length;
}