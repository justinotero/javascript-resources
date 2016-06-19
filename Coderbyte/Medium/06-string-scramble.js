function StringScramble(str1,str2) {
  var result = [];
  str1 = str1.split('');
  str2arr = str2.split('');
  for(var i = 0;i < str1.length; i++){
    for(var j = 0;j < str2arr.length; j++){
      if (str1[i] === str2arr[j]){
        result.push(str1[i])
        str2arr.splice(j,1);
      }
    }
  }
  return result.sort().join('') === str2.split('').sort().join('');
}