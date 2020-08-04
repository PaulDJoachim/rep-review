const houseReducer = (state = [{test: 'object'}], action) => {
  switch (action.type) {
    case 'SET_HOUSE':
      return action.payload;
    default:
      return state;
  }
};

// house will be on the redux state at:
// state.house
export default houseReducer;
