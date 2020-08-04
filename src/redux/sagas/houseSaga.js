import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getHouseSaga(action){
  //us try/catch for errors - replaces promise .then & .catch
  try {
    const response = yield axios.get('/api/house/');
    // in Sagas, replace `dispatch` with `put`
    yield put({ type: 'SET_HOUSE', payload: response.data.results[0].members});
    console.log('putting this in the house reducer:', response.data.results[0].members)
  } catch (error) {
      console.log('error with house get request', error);
  }
}

function* houseSaga() {
  yield takeLatest('GET_HOUSE', getHouseSaga);
}

export default houseSaga;