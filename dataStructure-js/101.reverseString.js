// 将一个英文语句中的单词,倒序输出;
// 如果两边有空格则去除,如果中间同时有多个空格时只保留一个.
const reverseString = str => {
  let strTrim = str.trim();
  if (!strTrim) return '';
  let strArr = strTrim.split(' ');
  let result = [];
  strArr.forEach(element => {
    element && result.push(element);
  });
  return result.reverse().join(' ');
}

console.log(reverseString(' I love China. '))
console.log(reverseString(' I love  China. '))
console.log(reverseString('I love China. '))

