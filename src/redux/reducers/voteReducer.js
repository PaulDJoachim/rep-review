import { combineReducers } from 'redux';

const recentVotes = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_RECENT_VOTES':
      return action.payload;
    default:
      return state;
  }
};

const voteInfo = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_VOTE_INFO':
      return action.payload;
    default:
      return state;
  }
};

const memberVotes = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_MEMBER_VOTES':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  recentVotes,
  voteInfo,
  memberVotes,
});