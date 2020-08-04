import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getSenateSaga(action){
  //us try/catch for errors - replaces promise .then & .catch
  try {
    const response = yield axios.get('/api/senate/');
    // in Sagas, replace `dispatch` with `put`
    yield put({ type: 'SET_SENATE', payload: response.data.results});
    console.log('putting this in the senate reducer:', response.data.results)
  } catch (error) {
      console.log('error with senate get request', error);
  }
}

function* senateSaga() {
  yield takeLatest('GET_SENATE', getSenateSaga);
}

export default senateSaga;