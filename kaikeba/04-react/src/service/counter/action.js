export const ADD = 'ADD';
export const MINUS = 'MINUS';
export const ASYNADD = 'ASYNADD';

export const add = () => ({ type: ADD });
export const minus = () => ({ type: MINUS });
export const asynAdd = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: ASYNADD });
  }, 1500)
}; 