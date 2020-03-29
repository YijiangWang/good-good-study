const path = require('path');
const strPath = 'c://aaa/bbb/ccc.exe';
console.log(path.basename(strPath));  //文件名
console.log(path.dirname(strPath));  // 文件路径
console.log(path.extname(strPath));  // 文件后缀 