function StringReduction(str) {
  var result = str.length + 1;
  while(result > str.length) {
    result = str.length;
    str = str.replace(/ab|ba/, 'c');
    str = str.replace(/ac|ca/, 'b');
    str = str.replace(/bc|cb/, 'a');
  };
  return str.length;
}