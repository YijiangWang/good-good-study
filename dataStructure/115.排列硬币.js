/**
 * 你总共有 n 枚硬币，你需要将它们摆成一个阶梯形状，第 k 行就必须正好有 k 枚硬币。
 * 给定一个数字 n，找出可形成完整阶梯行的总行数。
 * n 是一个非负整数，并且在32位有符号整型的范围内。
 * for 循环中使用break，退出当前循环；如果用return，退出当前循环所在的函数。
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
  let total = 0;
  let line = 0;
  for (let index = 0; index < n; index++) {
    total += index + 1;
    if (total > n) break;
    line++
  }
  return line;
}

console.time('a')
console.log(arrangeCoins(8));
console.timeEnd('a')