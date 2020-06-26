/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function(S, T) {
  while (S.indexOf('#')>-1 || T.indexOf('#')>-1){
    S = S.replace(/.?#/, '');
    T = T.replace(/.?#/, '');
  }
  return S === T;
};

console.log(backspaceCompare( "ab#c", "ad#c"))
console.log(backspaceCompare("ab##", "c#d#"))
console.log(backspaceCompare("a##c", "#a#c"))
console.log(backspaceCompare( "a#c","b"))