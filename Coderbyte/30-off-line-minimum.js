function PrimeTime(num) {
  if (num === 2) {return true;}
  return num > 1 && num % 2 !== 0 ? true : false;
}