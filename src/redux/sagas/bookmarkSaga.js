import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* addBookmark(action){
  //us try/catch for errors - replaces promise .then & .catch
  try {
    yield axios.post('/api/bookmark/', action.payload);
    yield put({ type: 'GET_BOOKMARKS', payload: action.payload[1] });
  } catch (error) {
      console.log('error with bookmark add saga:', error);
  }
}


function* getBookmarks(action){
  //us try/catch for errors - replaces promise .then & .catch
  try {
    const response = yield axios.get('/api/bookmark/');
    yield put({ type: 'SET_BOOKMARKS', payload: response.data});
    console.log('putting this in the bookmarks reducer:', response.data)
  } catch (error) {
      console.log('error with bookmark get saga', error);
  }
}


function* removeBookmark(action){
  //us try/catch for errors - replaces promise .then & .catch
  try {
    const response = yield axios.put('/api/bookmark/', action.payload);
    yield put({ type: 'GET_BOOKMARKS', payload: action.payload[1] });
  } catch (error) {
      console.log('error with bookmark delete saga', error);
  }
}

function* bookmarkSaga() {
  yield takeLatest('ADD_BOOKMARK', addBookmark);
  yield takeLatest('GET_BOOKMARKS', getBookmarks);
  yield takeLatest('REMOVE_BOOKMARK', removeBookmark);
}

export default bookmarkSaga;