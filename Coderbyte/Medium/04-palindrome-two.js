function PalindromeTwo(str) {
  var arr = str.replace(/[0-9\W_]+/g, '').toLowerCase();
  return arr.split('').reverse().join('') === arr;
}