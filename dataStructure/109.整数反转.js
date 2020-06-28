/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let numStr = String(x);
    let lessThanZero = false;
    if (x < 0) {
        lessThanZero = true
        numStr = numStr.slice(1)
    }
    let res = (lessThanZero ? -1 : 1) * parseInt(numStr.split('').reverse().join(''))
    if (-Math.pow(2, 31) > res || res > Math.pow(2, 31) - 1) {
        res = 0;
    }
    return res;
};
console.log(reverse(123))
console.log(reverse(-123))
console.log(reverse(120))