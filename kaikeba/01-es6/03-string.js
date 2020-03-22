// 1.字符串模板:可以直接植入变量,可以任意折行
const json = {
  name: 'yijiang',
  age: 18
};
const des1 = '我的名字叫: ' + json.name + ';我今年: ' + json.age;
const des2 = `我的名字叫: ${json.name};我今年: ${json.age}`;
console.log(des1);
console.log(des2);
// 我的名字叫: yijiang;我今年: 18 
// 我的名字叫: yijiang;我今年: 18

// 2.endsWith/startsWith
const path = 'document/aaa.txt';
console.log(`文件在 document 文件夹下: ${path.startsWith('document')}; 
文件是文本文件: ${path.endsWith('.txt')}`)
// 文件在 document 文件夹下: true; 
// 文件是文本文件: true