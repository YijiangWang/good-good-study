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