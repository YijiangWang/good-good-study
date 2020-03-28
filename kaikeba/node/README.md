#### Nodejs和其它语言比较
###### 优点
- node.js的对象/语法跟JavaScript一模一样,利于前端人员学习使用;
- 性能还不错.比PHP强很多;
- 前后台配合方便.
###### 缺点
- Java有及其丰富的库支持.
###### Nodejs用处
- 可以搭一个小型的后台系统/中间层;
- 工具:测试,构建(grunt/gulp/webpack...),抓取工具.

#### 搭建web服务器
- 首要前提:遵循http协议.
- 依赖模块.

> 说明:
1.nodejs和js一样,是单进程,单线程;
2.性能上在向多线程靠拢:主要靠非阻塞异步交互;

> nodejs做中间层目的:
1.安全性(现在需要多攻破一层);
2.性能高;
3.和前端交互更方便

```js
// 简单使用
const http = require('http');

const server = http.createServer((req, res) => {
  // req 接收到的数据
  // res 要发出去的数据
  console.log('yjw---server');
  console.log(req.url);
  res.write('What can I do for you?');
  res.end();
});

server.listen(8101);
/** 
 * 浏览器访问 localhost:8101/aaa
 * 会打印如下内容,原因:高版本浏览器会擅自主张的去加载favicon,所以会打印两次"yjw---server"
 * yjw---server
   /aaa
   yjw---server
   /favicon.ico
*/
```

- 说明:concat是浅拷贝,只复制一层,如果数组中放一个对象,修改对象里面的值会发现都被修改了.