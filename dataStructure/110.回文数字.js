/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let numString = String(x);
    let reverseString = numString.split('').reverse().join('');
    return numString === reverseString;
};