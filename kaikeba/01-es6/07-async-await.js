// async function show1(){
//   console.log('yjw---1');
//   await console.log('yjw---2');
//   console.log('yjw---3');
// };
// show1();
// // yjw---1
// // yjw---2
// // yjw---3

// async/await 一般和promise和generator配合使用,也可以是另一个async
// 定时器不被认为是异步操作
async function show2(){
  console.log('yjw---21');
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1111);
      console.log('yjw---22');
    }, 5000);
  });
  console.log('yjw---23')
}
show2();
// yjw---21
// 5s之后输出:yjw---22
// yjw---23