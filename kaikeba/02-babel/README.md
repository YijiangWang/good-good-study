#### babel 使用说明
###### 使用babel原因:
- es6语法被现代浏览器所兼容,但是比较老的IE6/7/8等不能支持es6语法,所以需要使用babel进行编译.

###### 使用:
- 通过在目标文件夹下运行`npm init`创建package.json文件夹;
- 安装babel依赖:`npm i --save-dev @babel/cli @babel/core @babel/preset-env`;
- 在项目根目录下创建文件夹`.babelrc`或者`babel.config.json`,里面的内容如下:
  ```
  {
    "presets": ["@babel/env"] // 预设: 根据环境进行配置
  }
  ```
- 在文件夹的script下添加命令`"build": "babel 源文件夹 --out-dir 目标文件夹"`,等同于直接运行`node_modules/.bin/babel 源文件夹 --out-dir 目标文件夹`;
- 这样在比较老的浏览器下就可以愉快的耍es6了.
  ```js
  // js 文件夹下的 index.js
  let a = 8;
  let [b,c] = [10,20];

  const func = () => {
    console.log(a + b);
  };
  func();
  ```
  ```js
  // 编译之后目标文件夹下的index.js文件
  "use strict";

  var a = 8;
  var b = 10,
      c = 20;

  var func = function func() {
    console.log(a + b);
  };

  func();
  ```