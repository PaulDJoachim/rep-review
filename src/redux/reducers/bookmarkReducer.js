const bookmarkReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BOOKMARKS':
      return action.payload;
    case 'CLEAR_BOOKMARKS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default bookmarkReducer;
