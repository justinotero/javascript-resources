function DashInsert(str) {
  var arr = str.split('');
  for (var i = 0; i < str.length-1; i++) {
    if (arr[i] % 2 !==0 && arr[i+1] % 2 !== 0) {
      arr[i] += '-'
    }
  }
  return arr.join('');
}