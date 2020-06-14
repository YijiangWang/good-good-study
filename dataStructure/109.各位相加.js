/**
 * 给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {
  while(Math.floor(num/10) > 0){
    num = Math.floor(num/10) + num%10
  }
  return num;
  return (num - 1) % 9 + 1;
};

console.log(addDigits(111))
console.log(addDigits(38))