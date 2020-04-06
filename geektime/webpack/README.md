#### 一.初识webpack
- 从4.0版本开始,webpack和webpack-cli是两个分开的模块,需要分别安装:`npm install webpack webpack-cli --save-dev`;
- 模块局部安装会在 node_modules/.bin 目录下创建软链接,如 node_modules/.bin/webpack;在package.json文件中可以直接获取到这些软链接.

#### 二.webpack的基本使用
###### 2.1.entry和output的使用
- 单入口(一般是单页应用)
```js
module.exports = {
  entry: './path/myEntry/file.js',
  output: {
    path: __dirname+'/dist',
    filename: 'bundle.js'
  }
}
```
- 多入口(一般是多页应用)
```js
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'       // 通过占位符确保文件名的唯一:文件名与entry中的key一一对应.
  }
}
```

###### 2.2.loaders
- webpack开箱即用只支持js和json两种文件类型,通过loaders去支持其它文件类型,并且把它们转化成有效的模块,并且可以添加到依赖图中;
- loaders本身是一个函数,接收源文件作为参数,返回转换的结果;
- 常见的loaders:
  |名称|描述|
  |:--:|:--:|
  |babel-loader|转换ES6,ES7等js新特性语法|
  |css-loader|支持css文件的加载和解析|
  |less-loader|将less文件转换成css|
  |ts-loader|将ts转换成js|
  |file-loader|进行图片/字体等的打包|
  |raw-loader|将文件以字符串的形式导入|
  |thread-loader|多进程打包js和css,加快打包速度|
- loaders的使用
```js
const path = require('path');
module.exports = {
  entry: {
    app: './src/app.js',
    login: './src/login.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'production',
  module: {
    // loaders放在module下的rules中,test指定匹配规则,use指定使用的loader名称
    rules:[
      {test: /\.txt$/, use: 'raw-loader'}
    ]
  }
}
```

###### 2.3.plugins
- 插件用于bundle文件的优化/资源管理/环境变量注入;
- 作用于整个构建过程(可以认为任何loaders不能完成的事情都可以通过plugins来完成).
- 常见的plugins,这里只列举部分常用的,还有其的很多
  |名称|描述|
  |:-:|:-:|
  |CommonsChunkPlugin|将chunks相同的模块代码提取成公共js|
  |CleanWebpackPlugin|清理构建目录|
  |ExtractTextWebpackPlugin|将css从bundle文件里提取成一个独立的css文件|
  |CopyWebpackPlugin|将文件/文件夹拷贝到构建的输出目录|
  |HtmlWebpackPlugin|创建html文件去承载输出的bundle|
  |UglifyjsWebpackPlugin|压缩js|
  |ZipWebpackPlugin|将打包出的资源生成一个zip包|