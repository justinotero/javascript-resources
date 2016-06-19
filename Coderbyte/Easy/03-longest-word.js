function LongestWord(sen) {
  return sen.replace(/[^a-z ]/gi, '').split(' ').sort(function (a, b) {
    return b.length - a.length;
  }).shift();
}