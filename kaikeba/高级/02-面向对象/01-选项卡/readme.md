## 面向对象
### 选项卡,工厂模式和 new 运算符
- 选项卡思路:
```
  // 一个选项卡 -> 按照需求一步一步走
  // 多个选项卡 -> 把共同逻辑提取
  // 扩展： 某一个功能
  //        第一个选项卡有下一页功能
  //        第二个选项卡有轮播功能
  // 所有选项卡共性的地方：封装；
  // 部分选项卡的功能：传参（配置）；
  // 独特功能 -> 部分选项卡需要的功能 ？ 传配置参数 : 一个选项卡独有功能（返回对象）
```
- 工厂模式：
```
  function Tab() {
    const obj = {};
    obj.name = 'yijiang';
    obj.age = 28;
    obj.psFor = function() {
      console.log('yijiang...');
    };
    return obj  
  }

  const tab1 = Tab();
  const tab2 = Tab();
  // 缺点一：对象识别问题
  console.log(tab1 instanceof Tab);   // false

  // 缺点二：性能问题，每次新建一个对象，都会重复定义 obj
  console.log(tab1.psFor === tab2.psFor); // false
```

- new 运算符
  ```txt
  new 运算符:
    1.执行函数;
    2.自动创建一个空对象;
    3.把创建的对象指向另外一个对象；
    4、把空对象和函数里的 this 衔接起来(this 指向实例化对象);
    5.隐式返还 this.
  ```
  > 通过 new 将工厂模式 转化为 构造函数

  ```
  构造函数
    1、约定俗成：首字符大写
    2、属性放在构造函数、方法放在原型
  ```
  > 每个原型上都有一个预定义属性：constructor --> 构造函数
  
  > 整体替换构造函数的prototype时一定要记得添加constructor属性

  ```js
  function Tab() {
    this.name = 'yijiang';
  }
  Tab.prototype = {
    constructor:Tab,
    psFor(){
        console.log("psFor...");
    },
    hobby(){
        console.log("hobby...",this.name);
    }
  }
  let t1 = new Tab();
  console.log(t1.name); // yijiang
  t1.hobby(); // hobby... yijiang
  console.log(t1.constructor === Tab);  // true
  console.log(t1.__proto__ === Tab.prototype);  // true

  let t2 = new Tab()
  console.log(t1.hobby === t2.hobby); // true

  //仿写new 运算符；
  function myNew(constructor, ...arg){
    let obj = {};
    constructor.call(obj,...arg); // 只能取到属性，不能取到 constructor 中的方法
    obj.__proto__ = constructor.prototype;  // 将构造函数的原型赋值给 obj.__proto__，这样就可以取到构造函数中的方法
    return obj;
  }
  let myN = myNew(Tab);
  console.log(myN.name);  // yijiang
  myN.psFor();  // psFor...
  ```