let arr = [2,3,4,5,5];
// 构造函数：用来构建某一类型的对象--对象的实例化
let s = new Set(arr) // 接受一个数组或者类数组作为参数
console.log(s, s.size);

// console.log(s.clear());  // undefined
// console.log(s.delete(2)); // true
// console.log(s.has(5));  // true
console.log(s.add(9));  // 返回新的 Set

console.log(s);



