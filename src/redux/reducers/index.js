import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import house from './houseReducer'
import senate from './senateReducer'
import member from './memberReducer'
import bio from './bioReducer'
import bookmarks from './bookmarkReducer'
import committees from './committeeReducer'
import bills from './billReducer'
import votes from './voteReducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  house, // holds a list of all house members
  senate, // holds a list of all senate members
  member, // holds details about a single congress member
  bio, // holds biographical info about a single congress member
  bookmarks, // holds bookmarks of logged in user
  committees, // holds lists of house, senate, and joint committees
  bills, // holds lists of bills & bill data
  votes, // hodls lists of votes & vote data
});

export default rootReducer;
