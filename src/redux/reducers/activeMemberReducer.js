const activeMemberReducer = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_ACTIVE_MEMBER':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default activeMemberReducer;
