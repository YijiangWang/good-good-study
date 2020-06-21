/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices.length === 0) return 0;
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    const element = prices[i];
    maxProfit += Math.max(prices[i] - prices[i-1], 0);
  }
  return maxProfit;
};

// [7,1,5,3,6,4]
console.log(maxProfit([7,6,4,3,1]))