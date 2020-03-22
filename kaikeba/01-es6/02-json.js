// 1.名字和值一样时,可以省略
const a = 15;
const b = 99;

const json1 = {
  a: a,
  b: b
};
const json2 = {
  a,
  b
};
console.log(json1.a, json2.a)
// 15 15

// 2.函数名称可以省略
const json3 = {
  a: 14,
  show: function(){
    console.log('yjw---json3');
  }
}
const json4 = {
  a: 14,
  show(){
    console.log('yjw---json4')
  }
}
const json5 = {
  a: 14,
  show: () => {
    console.log('yjw---json5');
  }
}
json3.show();
json4.show();
json5.show();
// yjw---json3
// yjw---json4
// yjw---json5
