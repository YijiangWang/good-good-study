/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  if (!matrix || matrix.length===0) return [];
  let rowl = 0, rowH = matrix.length - 1;  // 找出数组的上下边界
  let coll = 0, colH = matrix[0].length - 1; // 找出数组的左右边界
  const res = [];
  while (true) {
    for (let i = coll; i <= colH ; i++) {
      res.push(matrix[rowl][i])
    }
    if( ++rowl > rowH) break;
    for (let i = rowl; i <= rowH; i++) {
      res.push(matrix[i][colH])
    }
    if( --colH < coll) break;
    for (let i = colH; i >= coll; i--) {
      res.push(matrix[rowH][i])
    }
    if ( --rowH < rowl) break;
    for (let i = rowH; i >= rowl; i--) {
      res.push(matrix[i][coll])
    }
    if( ++coll > colH) break;
  }
  return res;
};

console.log(spiralOrder([]));