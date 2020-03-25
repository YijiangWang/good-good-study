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