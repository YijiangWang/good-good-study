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