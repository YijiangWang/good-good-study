/**
 * @param {number[]} bits
 * @return {boolean}
 */
var isOneBitCharacter = function(bits) {
  // 最后一个数是0，，则最后一个字符必定为一个一比特字符；如果前一个数是1，则答案不一定；如果前面又偶数个1，则最后一个字符必定为一个一比特字符，如果有奇数个1，则最后一个字符就不是一个一比特字符
  let length = 0;
  for(let i=bits.length-2; i>=0; i--){
    if (bits[i] === 1) {
      length++;
    } else {
      break;
    }
  }
  if(length % 2 === 0) {
    return true;
  } else {
    return false;
  }
};

console.log(isOneBitCharacter([1, 1, 1, 0]))