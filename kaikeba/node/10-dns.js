// TCP--稳定,net
// UDP--快,ucp/dgram
const dns = require('dns');
dns.resolve('baidu.com', (err, res) => {
  if(err){
    console.log('域名解析错误', err);
  }else{
    console.log('域名解析成功:', res);
  }
});