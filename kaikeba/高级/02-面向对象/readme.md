## 面向对象
### 01-选项卡和工厂模式
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
  console.log(tab1 === tab2); // false
```