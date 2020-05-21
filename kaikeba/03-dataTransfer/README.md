#### 数据交互
- 表单--最基本,最简单.其中通过ajax/jsonp,后台接收到的也是表单,只是前台有一些不同(http数据请求其实都是表单);
- ajax--不用刷新,节省流量,降低服务端压力,提高用户体验.默认情况下不可以跨域,但是可以跨域,需要服务端去配合;
- jsonp--可以实现跨域,使用性在减少,安全性太差;
- websocket--性能比较高,双向通信(双工),直接跨域.
  |种类|比较结果|
  |:-:|:-:|
  |ajax|性能低,单向,跨域麻烦|
  |websocket|性能高,双向(双工),直接跨域|

#### 跨域
- xss: 跨站脚本攻击,比如从其它域名读取文件之后不做校验直接使用;
- 跨域有风险,开发需谨慎.

###### 解决跨域方向
1. 表单;
2. ajax--麻烦,但是安全;
3. jsonp--简单,但是有风险;
4. websocket.

###### http协议
- http1.0: 一次性连接;
- http1.1: 保持连接;
- http2.0: 草案(1.强制https;2.自带双向通信;3.多路复用).

- 三次握手/四次回收;
- http消息(头[最大32K],体[最大1G]);

- 五层/七层模型
  |五层模型|OSI七层交换模型(参考)|作用|
  |:-:|:-:|:-:|
  |物理层|物理层|材料/电压|
  |链路层|链路层|内网寻址(ARP/ICMP[ping])|
  |网络层|网络层|外网寻址(IP)|
  |传输层|传输层|通信稳定性(TCP)|
  |*|表现层|统一各个网络结构(后归到传输层)|
  |*|会话层|记录状态(后归到应用层)|
  |应用层|应用层|应用细节(http/ftp/smtp/pop3)|

- TCP和UDP
  |TCP|UDP|
  |:-:|:-:|
  |保证到达|不保证到达|
  |保证质量|不保证质量|
  |保证顺序|不保证顺序|
  |文件下载/聊天|IP电话/视频直播(对质量没有绝对要求/对延时有很高要求)|

###### 1.表单提交数据
- 对于服务器而言,区分不出来到底是form还是ajax或者jsonp,除非加额外的字段来区分.
- 表单里面的属性;
  - action: 提交到哪里;
  - method: 提交方式--GET/POST/PUT/HEADER/DELETE/自定义[自定义需要服务器进行配置];
  - name: 必须要有name,否则提交不上去,服务器靠name来区分各自对应的数据;name属性值可以是相同的,相同的name属性值到服务器那里就是一个数组;
  ```html
  <form action='http://localhost/a.php' method='GET'>
    用户名: <input type='text' name='user'><br> 
    密码: <input type='password' name='pass'><br>
    <input type='submit' value='提交'>
  </form>
  ```
- 不同数据提交方法区别;
  |GET|POST|
  |:-:|:-:|
  |数据放在地址里;|在http的body里,容量大;|
  |看得见(仅限表单/如果用ajax也看不见)|看不见|
  |有缓存|不缓存|
  |利于分享和收藏|没法分享和收藏|
  - GET和POST安全性完全一致,安全还是要靠https来把关.
- 校验.
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <form action="./02-ajax.php" method="get" id="yjwForm">
      用户名: <input type='text' name='a'><br>
      密码: <input type='test' name='b'><br>
      <input type='submit' value='提交'>
    </form>
  </body>
  <script>
    window.onload = () => {
      const $ = document.querySelectorAll.bind(document);
      const yjwForm = $('#yjwForm')[0];
      
      // 获取用户名和密码
      const user = document.getElementsByName('a')[0];
      const pass = document.getElementsByName('b')[0];

      // form表单有一个提交事件,在提交时进行空或者其它校验
      yjwForm.onsubmit = () => {
        if(user.value=='' || pass.value==''){
          alert('用户名或者密码不能为空');
          return false; // 防止默认事件
        }
      }
    }
  </script>
  </html>
  ```

- 自制jquery里面的`$`
  ````js
  // 方法一
  const $ = document.querySelectorAll.bind(document);
  // 方法二
  const $ = function (...args){
    return document.querySelectorAll(...args);
  }
  // 使用
  $('#doc')[0];
  ````
- 02-ajax.php 文件内容如下
  ```php
  <?php
    echo $_GET['a'] + $_GET['b']
  ?>
  ```
  - 说明：这里不需要了解php，只是为了验证表单提交和ajax提交的区别：表单提交会刷新页面，ajax提交不会刷新页面；而后台使用的是同一套代码。
  - 如果要让这里的php代码跑起来，需要安装wamp软件，然后将这几个文件复制到对应的www/文件夹下即可验证。
  - 有一个表单验证的插件：jQuery validate。
###### 2.ajax 提交
- ajax提交
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Document</title>
    <script src="jquery-3.4.1.min.js"></script>
  </head>
  <body>
    <script>
      $(function(){
        $('.btn').click(function(){
          $.ajax({
            url: '02-ajax.php',   // 这里不需要会php，这里只是为了需要创建了该文件
            data: {a:12,b:23},
            type: 'get',
            dataType: 'text',   // 数据格式有很多
            error(err){
              console.log('err---> ',err);
            },
            success(res){
              console.log('success---> ', res);   //35
            }
          })
        })
      })
    </script>
    <button class="btn">按钮</button>
  </body>
  </html>
  ```
- 什么时候用ajax，什么时候使用表单提交？
  - 听项目组安排。
  - 表单更稳定，网络比较差的情况下，用户提交成功率更高，是浏览器实现的功能；
  - ajax 无刷新，用户体验好，是js里面实现的功能。
- 表单重复提交怎么处理？
  - 开始提交的时候--禁用submit；
  - 完成（成功/失败）--启用submit[比如ajax里面的complete]。

###### 3.ajax 原生实现：
- 可参见：[Ajax详解](https://www.jianshu.com/p/9142b2a0ed52)；
- 异步：并行，可以一块进行；
- 同步：串行，一个一个来，前一个操作没结束，后面一个操作得等着。
- get 请求：
  ```html
  <body>
    <script>
      window.onload = function() {
        const $ = document.querySelectorAll.bind(document);
        const btn = $('.btn')[0];
        btn.onclick = function() {
          // XMLHttpRequest，有些人叫做 xhr
          // 1.创建
          let xhr = '';
          if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
          }else{
            // 兼容 IE6，笔者公司现在只要求兼容 Chrome 和 Firefox
            xhr = new ActiveXObject('Microsoft.XMLHttp')  
          }
          // 2.连接
          xhr.open('get','./02-ajax.php?a=11&b=12',true); //第三个参数表示是否异步
          // 3.发送，可以带参数body，但这里是get请求
          xhr.send();
          // 4.接受
          // 当通信状态发生变化时
          xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200){
              console.log(xhr.responseText);
            }
          }
        }
      }
    </script>
    <button class="btn">按钮</button>
  </body>
  ```
- xhr 返回的数据有两种：responseText（文本）和responseXML（XML数据）；
- readState 的取值和含义：
  |readState|含义|
  |:-:|:-:|
  |0|初始化--刚刚创建|
  |1|已连接|
  |2|已发送|
  |3|已接收--响应头header|
  |4|已接收--响应体body|
- 当 readyState 为4时有可能成功有可能失败，如果要区分成功失败要配合 status==200 使用。
  |http状态码|含义|
  |:-:|:-:|
  |1XX|消息|
  |2XX|成功|
  |3XX|重定向|
  |301|永久重定向，浏览器永远不是再请求老地址了|
  |302|临时重定向，浏览器下次还会请求老地址|
  |304|读取本地缓存|
  |4XX|请求错误（客户端）|
  |5XX|服务器错误|
  |6XX|扩展的状态码|
- 重定向和转发：
  - 重定向：服务器给浏览器下命令，让浏览器去请求另一个地址--浏览器地址也会跟着改变；
  - 转发：在服务器内部完成，把请求转交给另一个模块处理，对客户端是不可见的--浏览器地址不变。

- post 请求：
  - content-type 取值：
    - 告诉对方实际传过去的数据类型：
    - text/plain ：纯文本格式;
    - multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式；
    - application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）等等。
  - 与get有两处不同：一、在send之前要 *setRequestHeader*；二、要把数据放在send中发送：
    ```js
    <script>
      window.onload = function() {
        const $ = document.querySelectorAll.bind(document);
        const btn2 = $('.btn2')[0];
        btn2.onclick = function() {
          // XMLHttpRequest，有些人叫做 xhr
          // 1.创建
          let xhr2 = '';
          if(window.XMLHttpRequest){
            xhr2 = new XMLHttpRequest();
          }else{
            // 兼容 IE6，笔者公司现在只要求兼容 Chrome 和 Firefox
            xhr2 = new ActiveXObject('Microsoft.XMLHttp')  
          }
          // 2.连接
          xhr2.open('post','./03-ajax-post.php',true); //第三个参数表示是否异步
          // 2.1.设置请求头
          xhr2.setRequestHeader('content-type','application/x-www-form-urlencoded')
          // 3.发送，可以带参数body，但这里是get请求
          xhr2.send('a=88&b=12');
          // 4.接受
          // 当通信状态发生变化时
          xhr2.onreadystatechange = function() {
            if(xhr2.readyState == 4 && xhr2.status == 200){
              console.log(xhr2.responseText);
            }
          }
        }
      }
    </script>
    <button class="btn2">post</button>
    ```

-----------封装ajax---------p9 32min

###### 4.