### hook

- 使用函数式组件时，尽量减少在函数中声明子函数，因为每次更新时都会重新创建这个函数。
- 优势：
  - 简化组件逻辑；
  - 复用状态逻辑；
  - 无需使用类组件编写。

##### 一、useState

```js
import React, {useState} from 'react';

function H1state(props) {
  const [count, setCount] = useState(0);

  return (<div>
    <h2>{props.name}</h2>
    <p>您点击了{count}次</p>
    <input type="button" onClick={()=>{setCount(count+1)}} value='点击'/>
  </div>)
}

export default H1state;
```

