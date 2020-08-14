import { combineReducers } from 'redux';

const districtReducer = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_DISTRICT':
      return action.payload;
    default:
      return state;
  }
};

export default districtReducer;