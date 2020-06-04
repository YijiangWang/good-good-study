var majorityElement = function(nums) {
  let obj = {};
  const length = nums.length;
  let value = nums[0];
  nums.forEach(element => {
    obj[element] = obj[element] ? obj[element] + 1 : 1;
    if (obj[element] > length/2) {
      console.log(length,element, obj[element])
      value = element
    }
  });
  return value;
};

let major = majorityElement([2,2,1,1,1,1,2])
console.log(major)