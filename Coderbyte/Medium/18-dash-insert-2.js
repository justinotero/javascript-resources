function DashInsertII(num) {
  var arr = num.split('');
  for (var i = 0; i < num.length - 1; i++) {
    if (num[i] % 2 !== 0 && num[i+1] % 2 !== 0) {
      arr[i] += '-';
    } else if (num[i] % 2 === 0 && num[i+1] % 2 === 0 && num[i] !== '0' && num[i+1] !== '0') {
      arr[i] += '*';
    }
  }
  return arr.join('');
}