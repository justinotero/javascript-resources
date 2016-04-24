function LetterCount(str) {
  str = str.split(' ');
  var greatestWord;
  var greatest = 0;
  var map = {};
  for (var j = 0; j < str.length; j++) {
    for (var i = 0; i < str[j].length; i++) {
      if (!map[str[j][i]]) {
        map[str[j][i]] = 1;
      } else {
        map[str[j][i]]++;
        if (map[str[j][i]] > greatest) {
          greatest = map[str[j][i]];
          greatestWord = str[j];
        }
      }
    }
    map = {};
  }
  return greatest > 1 ? greatestWord : -1;
}