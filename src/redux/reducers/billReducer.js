import { combineReducers } from 'redux';

const recentBills = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_RECENT_BILLS':
      return action.payload;
    default:
      return state;
  }
};

const billInfo = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_BILL_INFO':
      return action.payload;
    case 'CLEAR_BILL_INFO':
      return [{test: 'object'}];
    default:
      return state;
  }
};

export default combineReducers({
  recentBills,
  billInfo,
});