// 新增5个重要方法: map/reduce/filter/forEach/Array.form

const arr = [8, 4, 9, 11, 88];

const arr1 = arr.map((value, index) => {
  return Math.pow(value, 2);
})
console.log('arr1---> ', arr1);   
// arr1--->  [ 64, 16, 81, 121, 7744 ]

arr.forEach((value, index) => {
  // 在函数内部获取数组的值进行相应处理
  // console.log(value + 2)
})

const arr3 = arr.filter(value => {
  return value>50
})
console.log('arr3---> ', arr3);
// arr3--->  [ 88 ]

const arr4 = arr.reduce((accumulator, curValue, curIndex, array) => {
  console.log('yjw---4---> ', accumulator, curValue, curIndex, array)
  return accumulator + curValue
})
console.log('yjw---arr4---> ', arr4);
// yjw---4--->  8 4 1 [ 8, 4, 9, 11, 88 ]
// yjw---4--->  12 9 2 [ 8, 4, 9, 11, 88 ]
// yjw---4--->  21 11 3 [ 8, 4, 9, 11, 88 ]
// yjw---4--->  32 88 4 [ 8, 4, 9, 11, 88 ]
// yjw---arr4--->  120

const arr5 = arr.reduce((accumulator, curValue, curIndex, array) => {
  console.log('yjw---5---> ', accumulator, curValue, curIndex, array)
  return accumulator + curValue
}, 10)
console.log('yjw---arr5---> ', arr5);
// yjw---5--->  10 8 0 [ 8, 4, 9, 11, 88 ]
// yjw---5--->  18 4 1 [ 8, 4, 9, 11, 88 ]
// yjw---5--->  22 9 2 [ 8, 4, 9, 11, 88 ]
// yjw---5--->  31 11 3 [ 8, 4, 9, 11, 88 ]
// yjw---5--->  42 88 4 [ 8, 4, 9, 11, 88 ]
// yjw---arr5--->  130

// arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
// 回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。

// Array.from() 将类数组转化为数组