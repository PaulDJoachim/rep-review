const memberReducer = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_MEMBER':
      return action.payload;
    case 'CLEAR_MEMBER':
      return [{test: 'object'}];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default memberReducer;
