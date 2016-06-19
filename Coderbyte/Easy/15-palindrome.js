function Palindrome(str) {
  var rev = str.match(/[a-z]/gi).reverse().join('').toLowerCase();
  var str = str.match(/[a-z]/gi).join('').toLowerCase();
  return str === rev;
}