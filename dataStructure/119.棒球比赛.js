/**
 * 1.整数（一轮的得分）：直接表示您在本轮中获得的积分数。
 * 2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
 * 3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
 * 4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function(ops) {
  if (ops.length === 0) return 0;
  let res = [];
  for (let i=0; i<ops.length; i++) {
    let length = res.length;
    switch (ops[i]) {
      case '+': {
        let nValue = +res[length-1] + (+res[length-2]);
        res.push(nValue);
        break;
      }
      case 'D': {
        res.push(res[length-1] * 2);
        break;
      }
      case 'C': {
        res.pop();
        break;
      }
      default: {
        res.push(ops[i]);
        break;
      }
    }
  }
  let sum = 0;
  console.log(res)
  for (let i=0; i<res.length; i++){
    sum += +res[i];
  }
  return sum;
};

console.log(calPoints(["5","-2","4","C","D","9","+","+"]));