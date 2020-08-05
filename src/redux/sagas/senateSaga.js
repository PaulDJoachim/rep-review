import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getSenateSaga(action){
  //us try/catch for errors - replaces promise .then & .catch
  try {
    const response = yield axios.get('/api/senate/');
    let activeMember = []
    // check all members listed to make sure they are active before adding them to the reducer store
    response.data.results[0].members.map((member) => member.in_office ? activeMember.push(member):'');
    yield put({ type: 'SET_SENATE', payload: activeMember});
    console.log('putting this in the senate reducer:', response.data.results[0].members)
  } catch (error) {
      console.log('error with senate get request', error);
  }
}

function* senateSaga() {
  yield takeLatest('GET_SENATE', getSenateSaga);
}

export default senateSaga;