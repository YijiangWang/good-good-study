// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。
// 注意：你不能在买入股票前卖出股票。

var maxProfit = function(prices) {
  if( prices.length === 1) return 0;
  let minPrice = prices[0];
  let profit = 0;
  for (let i=1; i<prices.length; i++){
    if(prices[i]<minPrice){
      minPrice = prices[i];
    }else if(prices[i]-minPrice>profit){
      profit = prices[i]-minPrice;
    }
  }
  return profit;
};