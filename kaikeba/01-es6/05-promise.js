// 将异步操作同步化(是一个语法糖),可以将大量异步操作串行起来(内部还是异步,只是写着像同步)
// js 并发是通过 webWorker 来实现的
// 局限:一.新建之后就会立即执行,中途不能中断;二.如果不设置回调函数,Promise内部抛出的错误就不会反应到外部;三.当处于pending状态时,无法得知进展到哪里(刚开始还是即将结束).

// 回调函数说明:只管定义,自己不知道什么时候执行,是一个闭包
function testCb(a,b,cb){
  const sum = a + b;
  console.log(sum);
  cb(sum);
}
function callback (c){
  console.log('yjw---c---> ', c);
}
testCb(6,8,callback);
// 14
// yjw---c--->  14

// 1.Promise新建后会立即执行
let p1 = new Promise((resolve, reject) => {
  console.log('new promise');
  resolve('ttt');
});
p1.then(res => {
  console.log('yjw---> ', res);
})
console.log('yjw------p1');
// new promise
// yjw------p1
// yjw--->  ttt

// 2.reject函数参数通常是Error对象的实例;但resolve函数的参数除了正常的值以外,还可能是另一个Promise实例.
let p21 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('yjw---fail'));
  }, 3000);
})
let p22 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(p21)
  }, 1000);
})
// then通常有两个回调函数,第一个是正确的回调函数,第二个是错误的回调函数(可以不提供)
p22.then(res => {
  console.log('res1---> ', res);
}, err => {
  console.log('err1---> ', err);
});
// err1--->  Error: yjw---fail
说明:这里的p21的状态会