/**
 * 1.寻找数组中和等于26的两个数，打印出它们在数组中对应的位置;
 * 2.一个值只能用一次
 */
const arr1 = [1, 2, 6, 8, 13, 18, 25, 13];
const target = 26
// 方法一
const fun01 = (nums, target) => {
  for (let i = 0; i < nums.length - 1; i++) {
    const a = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      const b = nums[j];
      if (a + b === target) {
        return [i, j]
      }
    }
  }
}

// 方法二
const fun02 = (nums, target) => {
  let obj = {}
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    if(element in obj){
      return [obj[element], index]
    }
    obj[target-element] = index;
  }
}

