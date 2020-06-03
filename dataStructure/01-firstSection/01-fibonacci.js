const fib = n => {
  if(n<2) return n;
  return fib(n-1) + fib(n-2);
}

console.log(fib(60)); //55

// 方法二：
const fib2 = n => {
  if(n<=1) return n;
  let first = 0;
  let second = 1;
  for(let i=1; i<n; i++){
    let sum = first + second;
    first = second;
    second = sum;
  }
  return second;
}
console.log(fib2(60)) //1548008755920