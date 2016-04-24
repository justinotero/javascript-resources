function ChangingSequence(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i+1] > arr[i] && arr[i+2] < arr[i+1] || arr[i+1] < arr[i] && arr[i+2] > arr[i+1]) {
      return i+1;
    }
  }
  return -1;