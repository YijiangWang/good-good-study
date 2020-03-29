// 处理二进制数据的结构
const fs = require('fs');

fs.readFile('readme.md', (err, data) => {
  if(err){
    console.log('err--> ', err);
  }else{
    console.log(data);  // 会以buffer形式打印
  }
});
fs.writeFile('111.txt', 'bbbbbbbb你好吗', (err, res) => {
  if(err){
    console.log('xie失败');
  }else{
    console.log('xie成功')
  }
})