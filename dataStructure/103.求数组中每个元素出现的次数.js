var majorityElement = function (nums) {
  let obj = {};
  const length = nums.length;
  for (let i = 0; i < length; i++) {
    if (nums[i] in obj) {
      obj[nums[i]] += 1
    } else {
      obj[nums[i]] = 1;
    }
  }
  return obj;
};

console.log(majorityElement([7, 6, 4, 3, 1, 3, 2]))