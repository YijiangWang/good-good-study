// 可以说是 promise 的一个升级版(也是一个语法糖)
// 把一个函数分成若干小块,分多次来执行

function* gen (){
  console.log('aaa');
  let a = yield;  // 到达这句是只会执行到 yield,不会执行赋值语句
  console.log('bbb'+a);
  yield 55;
  return 90;
}
const g = gen();
g.next(); // aaa
const res1 = g.next(' yijiang'); // bbb yijiang,这里往里面传值
console.log(res1);  //{ value: 55, done: false },这里是接受返回值
console.log(g.next());  // { value: 90, done: true }

// generator和promise配合使用:
// 1.需要外来的runner辅助执行--不统一/不标准/性能低
// 2.generator函数不能写成箭头函数

--- 看到 p6 32min 处 ---