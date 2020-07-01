## 知识点
### **var和let/const区别和联系**
- var：
  - 可以重复声明；
  - 作用域：全局作用域和函数作用域；
  - 会进行与解析；
- let、const：
  - 同一作用域下不能重复定义；
  - 作用域：全局作用域和块级作用域{}。
  - 不会进行与解析

### **作用域**
- 页面中有三个 li 
  ```js
    const lis = document.querySelectorAll('li');
    for(var i=0; i<lis.length; i++){
      lis[i].onclick = function() {
        console.log('点击：', i);
      }
    }
    // 点击： 3
  ```

  ```js
    const lis = document.querySelectorAll('li');
    for(let i=0; i<lis.length; i++){
      lis[i].onclick = function() {
        console.log('点击：', i);
      }
    }
    // 点击： 0
    // 点击： 1
    // 点击： 2
  ```

### **解构赋值**
- 快速交换a和b的值：[a,b] = [b,a];

### **展开运算符**
```js
  let a = [1, 2];
  let b = [3, 4, 5]
  let c = [3, 4, ...a, 5];  // [3, 4, 1, 2, 5];
  let [x, y, ...z] = c; //3 4 [1, 2, 5]
  // 对象也类似
  // 对象的拷贝，修改obj2中的内容，不影响obj1中的内容
  let obj2 = {...obj1};
```

### **Set**
- 对象的数据结构；
- 属性：size；
- 方法：clear()、delete()、has()、add();
- 可用于数组去重。
  ```js
  let arr = [2,3,4,5,5];
  // 构造函数：用来构建某一类型的对象--对象的实例化
  let s = new Set(arr) // 接受一个数组或者类数组作为参数
  console.log(s, s.size);

  // console.log(s.clear());  // undefined
  // console.log(s.delete(2)); // true
  // console.log(s.has(5));  // true
  console.log(s.add(9));  // 返回新的 Set，可以进行链式调用

  console.log(s);
  ```

### **Map**
- 对象的数据结构；
- 属性：size；
- 方法：clear()、delete()、get()、has()、set ();
  ```js
  let arr = [
    ['a', 1],
    ['b', 2],
    ['c', 3],
    ['d', 4]
  ];

  let m = new Map(arr);
  console.log(m, m.size);

  // console.log(m.clear());  // undefined
  // console.log(m.delete('a')); // true
  // console.log(m.has('a'));  // true
  // console.log(m.get('a'));  // 1
  console.log(m.set('f', 8));  // 返回一个新的 Map，可以进行链式调用

  console.log(m, m.size);
  ```

### **箭头函数**
- 注:箭头函数中的 this 会穿透,如果包含在多个嵌套的箭头函数中,会一直穿透
-  箭头函数没有不定参数（arguments）
  ```js
  function fn1() {
    console.log(arguments);
  }
  fn1(1,2,3,4,5);  // [1,2,3,4,5]

  const fn2 = (a,b,...rest) => {
    console.log(a,b,rest); 
  };
  fn2(3,4,5,6,7); // 3 4 [5, 6, 7]
  ```
- this 指向问题：箭头函数本身没有 this，调用箭头函数的 this 时，指向的是其声明时所在的作用域的 this：
  ```js
  document.onclick = function() {
    console.log(this);  // #document
  }
  ```
  ```js
  document.onclick = () => {
    console.log(this);  // Window
  }
  ```
  ```js
  document.onclick = function() {
    function fn1() {
      console.log(this)
    }
    fn1();  // Window

    const fn2 = () => {
      console.log(this);
    }
    fn2();  // #document
  }
  ```
  ```js
  let fn1;
  function fn2() {
    console.log(this);
    fn1 = () => {
      console.log(this)
    }
  }
  fn2();  // Window
  fn1();  // Window
  ```
  ```js
  let fn1;
  function fn2() {
    console.log(this);
    fn1 = () => {
      console.log(this);
    }
  }
  fn2 = fn2.bind(document);
  fn2();  // #document
  fn1();  // #document
  ```
- 默认值：
  ```js
  fn1 = (a=8) => {
    console.log(a)
  }
  fn1()
  ```

### **数组**
- Array.from(list)：把一个类数组转换成真正的数组。类数组：有下标有length。另一个方法：[...list]。
- Array.of(1,2,3,'A')，将参数组成一个数组；
- Array.isArray(data)：检测一个数是否是数组（类数组返回false）
- arr.find(callback)：返回满足条件的第一个值，如果没有满足条件的就返回undefined。
- flat：数组扁平化处理:
  ```js
  let arr = [[1,2,3],[2,3,[2,3,[4,5]]],[3,4,5]]
  console.log(arr.flat(Infinity))
  ```
- fill：arr.fill(value,startIdx,endIdx);
- includes：arr.includes(value,fromIdx)。

### **字符串**
- startsWith('aa',position):判断第position开始是否以'aa'开始;
- endsWith('aa',position):判断前position位是否以'aa'结束;
- repeat: str.repeat(count),将str重复count次.

### **模板字符串**
- 比较简单,这里不做过多赘述:`${a}`.

### **对象**
- 简洁表示法:
  ```js
  let a = 1;
  let b = 2;
  let obj1 = {
    a: a,
    b: b,
    c: function() {}
  }
  // es6表示法
  let obj2 = {
    a,
    b,
    c() {}
  }
  ```
- 属性名表示法:
  ```js
  let name = 'yijiang';
  let obj = {
    [name]: 18
  }
  //  obj = {yijiang: 18}
  ```
- 对象合并:
  ```js
  let obj1 = {
    a: 1,
    b: 2
  };
  let obj2 = {
    c: 3,
    d: 4
  };
  let obj = Object.assign({}, obj1, obj2);
  // Object.assign(obj1, obj2); // 把 obj2 合并到 obj1 中
  // 也可以通过展开运算符
  ```
- Object.is(a, b):判断两个值是否相等:
  - 两个值都是 undefined;
  - 两个值都是 null;
  - 两个值都是 true,或者都是 false;
  - 两个值是由相同个数的字符按照相同的顺序组成的字符串;
  - 两个值指向同一个对象;
  - 两个值都是数字,并且都是 +0;都是 -0;都是 NaN.[这里和 === 结果不一样]