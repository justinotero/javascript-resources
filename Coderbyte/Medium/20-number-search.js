function NumberSearch(str) {
  str = str.replace(/[^\d\w]/g, '');
  var sum = 0;
  var letterCount = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i].match(/\d/)) {
      sum += parseInt(str[i]);
    } else if (str[i].match(/\w/)) {
      letterCount++;
    }
  }
  return Math.round(sum / letterCount);
}