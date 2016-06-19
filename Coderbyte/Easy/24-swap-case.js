function SwapCase(str) {
  var arr = str.split('')
  for (var i = 0; i < str.length; i++) {
    if (arr[i] === arr[i].toLowerCase()) {
      arr[i] = arr[i].toUpperCase();
    } else {
      arr[i] = arr[i].toLowerCase();
    }
  }
  return arr.join('');
}