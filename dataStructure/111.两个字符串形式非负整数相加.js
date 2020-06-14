/**
 * num1 和num2 的长度都小于 5100.
 * num1 和num2 都只包含数字 0-9.
 * num1 和num2 都不包含任何前导零。
 * 不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式。
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let length1 = num1.length;
  let length2 = num2.length;
  let flag = 0;
  let bits = 0;
  let res = 0;
  while (length1 > 0 || length2 > 0 || flag) {
    let n1 = +num1[--length1] || 0;
    let n2 = +num2[--length2] || 0;
    res = res + (n1 + n2 + flag) % 10 * Math.pow(10, bits);
    n1 + n2 + flag >= 10 ? flag = 1 : flag = 0;
    bits++;
  }
  return '' + res;
  // let length1 = num1.length;
  // let length2 = num2.length;
  // let flag = 0;
  // let sum = 0
  // let res = '';
  // while (length1 > 0 || length2 > 0 || flag) {
  //   let n1 = +num1[--length1] || 0;
  //   let n2 = +num2[--length2] || 0;
  //   sum = n1 + n2 + flag ;
  //   res = sum % 10 + '' + res;
  //   sum >= 10 ? flag = 1 : flag = 0;
  // }
  // return '' + res;
};

console.log(addStrings('1', '9'))