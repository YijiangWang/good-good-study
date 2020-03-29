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

