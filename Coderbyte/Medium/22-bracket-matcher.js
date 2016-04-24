function BracketMatcher(str) {
  var count = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '(' || str[i] === ')') {
      count++;
    }
  }
  return count % 2 === 0 ? 1 : 0;
}