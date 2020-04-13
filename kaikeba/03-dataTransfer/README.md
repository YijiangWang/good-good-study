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

###### 表单提交数据
- 对于服务器而言,区分不出来到底是form还是ajax或者jsonp,除非加额外的字段来区分.
- 表单里面的属性;
  - action: 提交到哪里;
  - method: 提交方式--GET/POST/PUT/HEADER/DELETE/自定义[自定义需要服务器进行配置];
  - name: 必须要有name,否则提交不上去,服务器靠name来区分各自对应的数据;name属性值可以是相同的,相同的name属性值到服务器那里就是一个数组;
  ```js 
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
    <form action="http://localhost/a.php" method="POST" id="yjwForm">
      用户名: <input type="text" name='user'><br>
      密码: <input type="password" name="pass"><br>
      <input type="submit" value="提交">
    </form>
  </body>
  <script>
    window.onload = () => {
      const $ = document.querySelectorAll.bind(document);
      const yjwForm = $('#yjwForm')[0];
      
      // 获取用户名和密码
      const user = document.getElementsByName('user')[0];
      const pass = document.getElementsByName('pass')[0];

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
  count $ = document.querySelectorAll.bind(document);
  // 方法二
  count $ = function (...args){
    return document.querySelectorAll(...args);
  }
  // 使用
  $('#doc')[0];
  ````

###### 原生js


------- p8 35min --------