function MultipleBrackets(str) {
  var leftB = 0;
  var rightB = 0;
  var leftP = 0;
  var rightP = 0;
  for (var i = 0; i < str.length; i++){
    if (str[i] == '['){
      leftB++;
    }
    if (str[i] == ']'){
      rightB++;
    }
    if (str[i] == '('){
      leftP++;
    }
    if (str[i] == ')'){
      rightP++;
    }
  }
  return leftB === rightB && leftP  === rightP ? 1 + ' ' + Number(leftB + leftP) : 0;
}