function MeanMode(arr) {
  var mean = arr.reduce(function(a, b) {return a + b;}) / arr.length;
  var table = {};

  for (var i = 0; i < arr.length; i++) {
    var number = arr[i];
    table[number] === undefined ? table[number] = 1 : table[number] += 1;
  }

  var highest = {number: null, count: 0};

  for (var x in table) {
    if (table[x] > highest['count']) {
      highest['count'] = table[x];
      highest['number'] = x;
    }
  }
  return (highest['number'] == mean) ? 1 : 0;
}