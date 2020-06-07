/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  if (nums.length === 0) return 0;
  const newNums = [...new Set(nums)].sort((a,b)=>a-b);
  let length = 1, max = 1;
  for (let i = 0; i < newNums.length; i++){
    if (newNums.indexOf(newNums[i] + 1)>-1){
      length ++
    } else {
      length = 1;
    }
    max = Math.max(max, length);
  }
  return max;
};

console.log(longestConsecutive([100, 3,4 ,4, 101,200, 1, 3, 2]))