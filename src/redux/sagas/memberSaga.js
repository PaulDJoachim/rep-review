import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getMemberSaga(action){
  //us try/catch for errors - replaces promise .then & .catch
  try {
    const response = yield axios.get('/api/member/' + action.payload);
    response.data.results[0].roles[0].committees.map((committee, index) => {
      if (committee.code[0] === 'J') {committee.chamber = 'Joint'}
      else if (committee.code[0] === 'S' ) {committee.chamber = 'Senate'}
      else if (committee.code[0] === 'H') {committee.chamber = 'House'}
    });
    yield put({ type: 'SET_MEMBER', payload: response.data.results[0]});
    console.log('putting this in the member reducer:', response.data.results[0])
    yield put({ type: 'GET_BIO', payload: response.data.results[0].first_name + '_' + response.data.results[0].last_name})
  } catch (error) {
      console.log('error with member get request', error);
  }
}

function* memberSaga() {
  yield takeLatest('GET_MEMBER', getMemberSaga);
}

export default memberSaga;