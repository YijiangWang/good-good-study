// 1.寻找数组中和等于26的两个数，打印出它们在数组中对应的位置
const arr1 = [1,2,6,8,13,18,25,13];
let n = 0;
function func100(arr, tar){
  for(let i = 0; i < arr.length; i++){
    for(let j = i + 1; j < arr.length; j++){
      console.log('n: ',++n);
      if(arr[i] + arr[j] === tar){
        console.log('找到了：', i, ': ', arr[i], '; ', j, ': ', arr[j]);
      }
    }
  }
}

function func101 (arr, tar){
  var obj = {};
  arr.forEach((value, i) => {
    if(value in obj){   // 如果用 obj[value] 作为判断条件，会有bug
      console.log(i, ': ',value,'; ',obj[value],': ',tar-value)
    }
    obj[tar-value] = i;
  });
  console.log(obj)
}
func101(arr1, 26)