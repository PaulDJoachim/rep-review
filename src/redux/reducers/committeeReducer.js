import { combineReducers } from 'redux';

const houseCommittees = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_HOUSE_COMMITTEES':
      return action.payload;
    default:
      return state;
  }
};

const senateCommittees = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_SENATE_COMMITTEES':
      return action.payload;
    default:
      return state;
  }
};

const jointCommittees = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_JOINT_COMMITTEES':
      return action.payload;
    default:
      return state;
  }
};

const committee = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_COMMITTEE':
      return action.payload;
    case 'CLEAR_COMMITTEE':
      return [{test: 'object'}];
    default:
      return state;
  }
};

const info = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_COMMITTEE_INFO':
      return action.payload;
    case 'CLEAR_COMMITTEE_INFO':
      return [{test: 'object'}];
    default:
      return state;
  }
};

export default combineReducers({
  houseCommittees,
  senateCommittees,
  jointCommittees,
  committee,
  info,
});