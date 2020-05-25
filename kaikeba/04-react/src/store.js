import {createStore} from 'redux';

const counterReducer = (state=1,action)=>{
  switch (action.type){
    case 'add': 
      console.log('add')
      return state + 1
    case 'minus':
      console.log('minus')
      return state - 1
    default :
      return state;
  }
}

const store = createStore(counterReducer);

export default store;