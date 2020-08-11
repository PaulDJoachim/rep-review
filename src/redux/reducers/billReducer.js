import { combineReducers } from 'redux';

const recentBills = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_RECENT_BILLS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  recentBills,
});