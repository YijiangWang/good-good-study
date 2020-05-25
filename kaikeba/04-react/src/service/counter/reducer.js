import * as actions from './action.js';

export const counterReducer = (state=1,action)=>{
  switch (action.type){
    case actions.ADD: 
      console.log('add')
      return state + 1;
    case actions.MINUS:
      console.log('minus')
      return state - 1;
    case actions.ASYNADD:
      return state + 1;
    default :
      return state;
  }
}
