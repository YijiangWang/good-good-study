/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
  let gArr = g.sort((a, b) => a-b);
  let sArr = s.sort((a, b) => a-b);
  let gIndex = 0;
  let sIndex = 0;
  let total = 0;
  while (gIndex<g.length && sIndex<s.length){
    if (gArr[gIndex] <= sArr[sIndex]){
      total++;
      gIndex++;
    }
    sIndex++;
  }
  return total;
};

console.log(findContentChildren( [1,3], [1,2,3]))