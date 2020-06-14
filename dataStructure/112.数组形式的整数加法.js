/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
var addToArrayForm = function(A, K) {
  let kArr = String(K).split('');
  let length1 = kArr.length;
  let length2 = A.length;
  let flag = 0;
  let res = [];
  while(length1>0 || length2>0 || flag){
    let n1 = +kArr[--length1] || 0;
    let n2 = +A[--length2] || 0;
    res.unshift((n1 + n2 + flag) % 10);
    console.log((n1 + n2 + flag) % 10);
    (n1+n2+flag > 9) ? flag=1 : flag=0;
  }
  return res;
};

console.log(addToArrayForm([2,7,4], 181));
console.log(addToArrayForm([2,1,5], 806));
console.log(addToArrayForm([9,9,9,9,9,9,9,9,9,9], 1));