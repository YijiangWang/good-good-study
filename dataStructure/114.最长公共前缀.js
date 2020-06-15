/**
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 如果不存在公共前缀，返回空字符串 ""。
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) return '';
  let flag = true;
  let prefix = '';
  let index = 0;
  while (flag) {
    let temp = strs[0][index]
    if (!temp) flag = false;
    for (let i=1; i<strs.length; i++){
      if (strs[i][index] != temp){
        flag = false;
      }
    }
    flag === true && (prefix+=temp);
    index++
  }
  return prefix;
};

console.log(longestCommonPrefix([]))