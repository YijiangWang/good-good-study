let arr = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
  ['d', 4]
];

let m = new Map(arr);
console.log(m, m.size); // Map(4) { 'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4 } 4

// console.log(m.clear());  // undefined
// console.log(m.delete('a')); // true
// console.log(m.has('a'));  // true
// console.log(m.get('a'));  // 1
console.log(m.set('f', 8));  // 返回一个新的 Map，可以进行链式调用, Map(5) { 'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'f' => 8 }

console.log(m, m.size);