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

function show(){
  console.log(this);
};

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

// 箭头函数中的this
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