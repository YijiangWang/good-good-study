#### 开发工具
- 建议使用 eclipse：
  - 明亮、简洁、舒服；
  - 多个项目可以在同一窗口显示
  - 比 IDEA 轻量级。
- 下载地址：https://www.eclipse.org/downloads；
- jdk下载地址：https://www.oracle.com/java/technologies/javase-downloads.html；

#### 第一章
###### 1.fibonacci:求斐波那契第n项的值
- 0/1/1/2/3/5/8/13/21/34/55
  ```js
  // 方法一：会算很多遍，如果算fib(60)就会卡死：原因是会重复计算很多值；解决方案是每计算一个值就存起来，比如fib(50)，当在遇到fib(50)这个值时就不用去计算了，直接读取，但是会损耗内存空间
  const fib = n => {
    if(n<2) return n;
    return fib(n-1) + fib(n-2);
  }

  console.log(fib(10)); //55

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
  ```
- 时间复杂度：
  - 程序大概执行的次数；
  - 大O表示法：
    - 忽略常叔、系数；
    - 常数用O(1)表示；
    - 8n+1用O(n)表示；
    - n^2+n+9用O(n^2)表示；
    - logn+9用O(logn)表示；
    - 3n+2nlogn+9用O(nlogn)表示；
    - O(1)<O(logn)<O(n)<O(nlogn)<O(n^2)<O(n^3)<O(2^n)<O(n!)<O(n^n)
  - 注意：大O表示法仅仅是一种粗略的分析模型，是一种估算，能帮助我们短时间内了解一个算法的执行效率。 
- 空间复杂度：
  - 估算所需占用的存储空间；
  - 同样用大O表示法；
  - 但是程序正常情况下以考虑时间复杂度为主。
- 上面的fibonacci数列，第一种算法的时间复杂度为O(2^n)[自己可以推理]，第二种算法的时间复杂度为O(n)。
- 有时候算法之间的差距，往往比硬件方面的差距还要大。
- 算法优化方向：
  - 用尽量少的执行步骤（执行时间）；
  - 用尽量少的存储空间；
  - 有时候根据情况：
    - 空间换时间；
    - 时间换空间（一般的PC程序）。