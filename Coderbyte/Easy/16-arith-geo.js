function ArithGeo(arr) {
  var diff = arr[1] - arr[0];
  var ratio = arr[1] / arr[0];
  var arith = true;
  var geo = true;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i+1] - arr[i] !== diff) {
      arith = false;
    } else if (arr[i+1] / arr[i] !== ratio) {
      geo = false;
  }
}

  if (arith === true) {
    return 'Arithmetic';
  } else if (geo === true) {
    return 'Geometric';
  } else {
    return '-1';
  }
}