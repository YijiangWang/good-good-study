/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function(num) {
  // let flag = num >= 0 ? true : false;
  // let absNum = Math.abs(num);
  // let res = '';
  // while (absNum/7 >= 1){
  //   res = absNum % 7 + res;
  //   absNum = Math.floor(absNum / 7);
  // }  
  // res = absNum + res;
  // console.log(flag,res)
  // return flag ? res : '-' + res;
  let flag = num < 0 ? '-' : '';
  num = Math.abs(num);
  let res = '';
  while (num > 6) {
    res = res % 7 + res;
    num = Math.floor(num/7);
  };
  return flag + num + res;
};

console.log(convertToBase7(-7))