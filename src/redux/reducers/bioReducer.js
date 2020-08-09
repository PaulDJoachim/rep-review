const bioReducer = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_BIO':
      return action.payload;
    case 'CLEAR_BIO':
      return [{test: 'object'}];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default bioReducer;
