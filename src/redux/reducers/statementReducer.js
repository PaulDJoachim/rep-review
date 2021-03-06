import { combineReducers } from 'redux';

const recentStatements = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_RECENT_STATEMENTS':
      return action.payload;
    default:
      return state;
  }
};

const memberStatements = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_MEMBER_STATEMENTS':
      return action.payload;
    default:
      return state;
  }
};

const statementSearch = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_STATEMENT_SEARCH':
      return action.payload;
    case 'CLEAR_WELCOME_SEARCH':
      return [{test: 'object'}];
    default:
      return state;
  }
};


export default combineReducers({
  recentStatements,
  memberStatements,
  statementSearch,
});