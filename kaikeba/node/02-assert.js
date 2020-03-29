const assert = require('assert');
// assert是一个函数,接收两个参数:第一个为条件,第二个为触发时的提示信息
function sum(a, b){
  assert(arguments.length===2, '必须要传两个参数');
  assert(typeof a==='number', '第一个参数不是数字');
  assert(typeof b==='number', '第一个参数不是数字');
  return a + b;
}
console.log(sum(3));