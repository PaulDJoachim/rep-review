import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getVotesSaga(action){
  try {
    const response = yield axios.get('/api/votes/recent/');
    yield put({ type: 'SET_RECENT_VOTES', payload: response.data.results.votes});
    console.log('putting this in the recent votes reducer:', response.data.results.votes)
  } catch (error) {
      console.log('error with recent votes get request', error);
  }
}

function* getVoteInfoSaga(action){
  try {
    const response = yield axios.get('/api/votes/info/' + action.payload);
    yield put({ type: 'SET_VOTE_INFO', payload: response.data.results.votes.vote});
    console.log('putting this in the vote info reducer:', response.data.results.votes.vote)
  } catch (error) {
      console.log('error with vote get request', error);
  }
}

function* getMemberVotesSaga(action){
  try {
    const response = yield axios.get('/api/member/votes/' + action.payload);
    yield put({ type: 'SET_MEMBER_VOTES', payload: response.data.results[0].votes});
    console.log('putting this in the member votes reducer:', response.data.results[0].votes)
  } catch (error) {
      console.log('error with member votes get request', error);
  }
}


function* voteSaga() {
  yield takeLatest('GET_RECENT_VOTES', getVotesSaga);
  yield takeLatest('GET_VOTE_INFO', getVoteInfoSaga);
  yield takeLatest('GET_MEMBER_VOTES', getMemberVotesSaga);
}

export default voteSaga;