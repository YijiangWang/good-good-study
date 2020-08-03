import React, { useState, useEffect} from 'react';

function YjwEffect() {
  const [count, setCount] = useState(5);
  useEffect(() => {
    console.log('执行了 Effect')
    return () => {
      // 这里表示组件卸载时会执行
      console.log('---------')
    }
  }, [count]); // []：组件挂在之后执行;[count]：表示挂在之后和count更新之后会执行


  return (<div>
    <h2>study useEffect</h2>
    <strong onClick={()=>setCount(count+1)}>点击了{count}次</strong>
  </div>)
}

export default YjwEffect;