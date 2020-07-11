### 继承-深浅拷贝-拖拽
##### 继承
- call/apply/bind: 都是绑定一个对象
  - call(要绑定的对象, 参数1, 参数2 ...);
  - apply(要绑定的对象, [参数1, 参数2 ...]);
  - bind(要绑定的对象)(参数);
  ```js
  function Person(height=178) {
    this.name = '张三';
    this.age = 18;
    this.height = height;
    this.study = () => {
      console.log('好好学习');
    }
  }

  function Student(height=0){
    // 通过这个继承,只能继承构造函数里面的属性和方法,不能继承原型上的内容
    Person.call(this, height);
  }

  const stu = new Student(180);
  console.log(stu.height);  // 180
  console.log(stu.name);  // 张三
  stu.study();  // 好好学习
  ```

##### 继承原型上的方法
  ```js
  function Person(height) {
    this.name = '张三';
    this.height = height;
  }
  Person.prototype.hobby = () => {
    console.log('打篮球');
  }

  function Student(height=0) {
    // 三种方法继承,不会继承原型上的方法
    Person.call(this, height); 
    // Person.apply(this, [height]);
    // Person.bind(this)(height);
  }

  // 方法一、继承原型上的方法
  Student.prototype = Person.prototype; // 浅拷贝
  Student.prototype.constructor = Student;
  Student.prototype.hobby = () => {
    console.log('我喜欢踢足球');
  }
  const stu = new Student(180);
  // 方法二、继承原型上的方法
  // stu.__proto__ = Person.prototype;
  console.log(stu.height);  // 180
  console.log(stu.name);  // 张三
  stu.hobby();  // 我喜欢踢足球 必须要使用 stu.__proto__ = Person.prototype; 或者 Student.prototype = Person.prototype; 否则找不到hobby方法，发现原型上的方法没有继承过来
  const person = new Person();
  person.hobby();   // 我喜欢踢足球
  ```

##### 组合继承
- 通过中间对象,切断浅拷贝.
  ```js
  function Person(height) {
    this.name = '张三';
    this.height = height;
  }
  Person.prototype.hobby = () => {
    console.log('打篮球');
  }

  function Student(height=0) {
    // 三种方法继承
    Person.call(this, height);
    // Person.apply(this, [height]);
    // Person.bind(this)(height);
  }

  const Link = function() {};
  Link.prototype = Person.prototype;

  Student.prototype = new Link(); //这里通过 new 运算符创建了一个新对象,切断了浅拷贝 注:替换原型后需要执行constructor
  Student.prototype.constructor = Student;
  Student.prototype.hobby = function() {
    console.log('王者荣耀');
  }
  
  const stu = new Student(168);
  console.log(stu.height);  // 168
  stu.hobby();  // 王者荣耀   深拷贝

  const per = new Person(188);
  console.log(per.height);  // 188
  per.hobby() // 打篮球
  ```

##### 手写深拷贝代码
  ```js
  let obj = {
    a: 1,
    b: 'yijiang',
    c: function(){
      console.log('cccc');
    },
    d() {
      console.log('dddddd');
    },
    e: undefined,
    f: null,
    g: [1,2,3],
    h: [{a:2,b:3},5]
  }

  obj.__proto__.hobby = function() {
    console.log('hobby...');
  }

  // 序列化:函数和 undefined 会被忽略
  console.log(JSON.parse(JSON.stringify(obj)));

  function deepCopy(obj){
    const newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {  // 会遍历原型上的内容
      if(obj.hasOwnProperty(key)){
        if(typeof obj[key] === 'object'){
          if(obj[key] === null){
            newObj[key] = null
          } else {
            newObj[key] = deepCopy(obj[key]);
          }
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  }

  const newObj = deepCopy(obj);
  deepCopy(obj).hobby();  // hobby...
  obj.a = 'wang';
  console.log(newObj.a);  // 1
  ```

##### es6类
  ```js
  class Person{
    static test() {
      console.log('test...');
    }
    constructor() {
      this.age = 18;
    }
    study() {
      console.log('好好学习...');
    }
  }
  Person.age = 20; // 这里相当于添加了静态属性

  const per = new Person();
  console.log(Person.age); // 20
  console.log(per.age);  // 18
  console.log(typeof Person); // function
  console.log(typeof per);   // object
  console.log(per.constructor); // class Person{...}
  Person.test();  // test...
  per.study();  // 好好学习...
  console.log(per); // 注释:study 方法放在 __proto__ 里面
  ```

##### es6类的继承
  ```js
  class Person{
    static test() {
      console.log('test...');
    }
    constructor(height) {
      this.height = height
    };
    hobby() {
      console.log('高尔夫...')
    }
  }

  class Student extends Person{
    static test() {
      console.log('Stu test...');
    }
    constructor(height){
      super(height);
    }
    hobby() {
      super.hobby();
      console.log('考上清华...');
    }
  }

  const stu = new Student(178);
  console.log(stu.height);  // 178
  Student.test(); // Stu test...
  stu.hobby();  // 先调用父类的 hobby() "高尔夫...",再调用自己的 hobby() "考上清华..."
  ```
