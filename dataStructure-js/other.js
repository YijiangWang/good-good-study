/**
 * 1.寻找数组中和等于26的两个数，打印出它们在数组中对应的位置
 */ 
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
// func101(arr1, 26)


// 对一个已知数组进行从小到大排序
const arr2 = [5,12,4,7,9,27,2,25]
// 1、冒泡排序
function bubble(arr){
  for(let i = 0; i < arr2.length - 1; i++){
    for(let j = 0; j < arr2.length - 1 - i; j++){
      if(arr[j] > arr[j+1]){
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  console.log(arr2);
}
console.time('aaa');
bubble(arr2);
console.timeEnd('aaa');