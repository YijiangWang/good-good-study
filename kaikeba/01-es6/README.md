#### 一.数组
- 新增5个重要方法: map/forEach/filter/reduce/Array.form
````js
// 新增5个重要方法: map/reduce/filter/forEach/Array.form

const arr = [8, 4, 9, 11, 88];
// 一.map
const arr1 = arr.map((value, index) => {
  return Math.pow(value, 2);
})
console.log('arr1---> ', arr1);   
// arr1--->  [ 64, 16, 81, 121, 7744 ]

// 2.forEach
arr.forEach((value, index) => {
  // 在函数内部获取数组的值进行相应处理
  // console.log(value + 2)
})

// 3.filter
const arr3 = arr.filter(value => {
  return value>50
})
console.log('arr3---> ', arr3);
// arr3--->  [ 88 ]

// 4.reduce
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

// 6.Array.from
// Array.from() 将类数组转化为数组
````

#### 二.json
- 名字可以简写;
- function 可以省略.
```js
// 1.名字和值一样时,可以省略
const a = 15;
const b = 99;

const json1 = {
  a: a,
  b: b
};
const json2 = {
  a,
  b
};
console.log(json1.a, json2.a)
// 15 15

// 2.函数名称可以省略
const json3 = {
  a: 14,
  show: function(){
    console.log('yjw---json3');
  }
}
const json4 = {
  a: 14,
  show(){
    console.log('yjw---json4')
  }
}
const json5 = {
  a: 14,
  show: () => {
    console.log('yjw---json5');
  }
}
json3.show();
json4.show();
json5.show();
// yjw---json3
// yjw---json4
// yjw---json5
```

##### 三.string
- 字符串模板:可以直接植入变量,可以任意折行;
- endsWith/startsWith.
```js
// 1.字符串模板:可以直接植入变量,可以任意折行
const json = {
  name: 'yijiang',
  age: 18
};
const des1 = '我的名字叫: ' + json.name + ';我今年: ' + json.age;
const des2 = `我的名字叫: ${json.name};我今年: ${json.age}`;
console.log(des1);
console.log(des2);
// 我的名字叫: yijiang;我今年: 18
// 我的名字叫: yijiang;我今年: 18

// 2.endsWith/startsWith
const path = 'document/aaa.txt';
console.log(`文件在 document 文件夹下: ${path.startsWith('document')}; 
文件是文本文件: ${path.endsWith('.txt')}`)
// 文件在 document 文件夹下: true; 
// 文件是文本文件: true
```

#### 四.类和继承
- 类;
- 继承;
- 可以拥有内部类,但是可以忽略.
```js
// 1.类
class Person{
  // 构造函数,刚开始会执行的函数
  constructor(name, age){
    this.name = name;
    this.age = age;
  }

  show() {
    console.log(`我是:${this.name},我今年:${this.age}`);
  }
}

const p = new Person('yijiang',16);
p.show();
// 我是:yijiang,我今年:16

// 2.继承
// 2.1.super 会把父类的属性继承过来
// 2.2.extends 会把父类的方法继承过来
class Student extends Person{
  constructor(name, age, job){
    super(name, age); // 实现父类的构造方法
    this.job = job;
  }

  show() {
    console.log(`我是: ${this.name},我今年:${this.age},我的职业是:${this.job}`);
  }
}
const stu = new Student('yijiang',18,'student');
stu.show();
// 我是: yijiang,我今年:18,我的职业是:student
```
- bind: 给函数定死一个this,用法 func.bind('aaa');
```js
function show(){
  console.log(this);
};
document.onclick = show.bind(12)  // 点击会打印12
```
- 普通函数:this根据调用我的人;
```js
// 普通函数中的this
document.onclick = function(){
  console.log(this)// document 对象
}
window.setTimeout(function(){
  console.log(this) // window对象
}, 5000);

let arr = [8,9,11];
arr.a = function(){
  console.log(this);  // [8,9,11]
};
arr.a();
```
- 箭头函数:this根据所在的环境.
```js
// 箭头函数中的this,指向恒定
document.onclick = () => {
  console.log(this);  // 打印 window 对象
};
window.setTimeout(() => {
  console.log(this);  // 打印 window 对象
}, 5000);
let arrowArr = [1,2,3];
arrowArr.a = () => {
  console.log(this);  // window 对象
}
arrowArr.a();

document.onclick = function(){
  let arr = [3,4,5];
  arr.a = () => {
    console.log(this) // 打印 document 对象
  }
  arr.a();
}
```
- 箭头函数的优先级比 bind 高:即给箭头函数使用 bind,箭头函数中的 this 并不是 bind 的对象,而是箭头函数所在的环境(作用域).

#### 五.Promise
- Promise有点:解除异步操作;
- Promise局限:待逻辑的异步操作很麻烦,如下情况:
```js
if(异步操作1){
  异步操作2
}else{
  异步操作3
}
```

#### 六.generator--生成器
- 能暂停;