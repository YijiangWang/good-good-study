function* gen(){
  let a = yield '1';
  console.log(a);
  // let b = yield('2');
  yield('2');
  // console.log(b);
}

let it = gen();
console.log(it.next());   // {value: '1', done: false}
console.log(it.next("我是被传进来的1"));  //"我是被传进来的1"  {value: '2', done: false}
console.log(it.next("我是被传进来的2"));  //"我是被传进来的2"   {value: undefined, done: true}
