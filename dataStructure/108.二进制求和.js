/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  if(!a) return b;
  if(!b) return a;
  const aa = a.split('').reverse().join('');
  const bb = b.split('').reverse().join('');
  let overFlag = 0;
  let answer = '';
  for(let i = 0; i < Math.max(aa.length, bb.length); i++){
    let aaa = aa[i] ? parseInt(aa[i]) : 0;
    let bbb = bb[i] ? parseInt(bb[i]) : 0;
    const cur = (aaa + bbb + overFlag) % 2;
    console.log('cur---> ',cur,a[i],bbb,aa,bb);
    answer += cur 
    if (aaa + bbb + overFlag> 1){
      overFlag = 1;
    } else {
      overFlag = 0
    }
  }
  if (overFlag) answer += 1;
  return answer.split('').reverse().join('');
};

console.log(addBinary("11", '1'))