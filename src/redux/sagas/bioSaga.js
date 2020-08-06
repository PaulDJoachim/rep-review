import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getBioSaga(action){
  //us try/catch for errors - replaces promise .then & .catch
  try {
    const response = yield axios.get('/api/bio/' + action.payload);
    yield put({ type: 'SET_BIO', payload: response.data.query.pages[Object.keys(response.data.query.pages)[0]]});
    console.log('putting this in the bio reducer:', response.data.query.pages[Object.keys(response.data.query.pages)[0]])
  } catch (error) {
      console.log('error with bio get request', error);
  }
}

function* bioSaga() {
  yield takeLatest('GET_BIO', getBioSaga);
}

export default bioSaga;