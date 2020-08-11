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

export default combineReducers({
  houseCommittees,
  senateCommittees,
  jointCommittees,
});