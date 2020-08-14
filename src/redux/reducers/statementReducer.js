import { combineReducers } from 'redux';

const recentStatements = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_RECENT_STATEMENTS':
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
  recentStatements,
});