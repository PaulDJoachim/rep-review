import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getHouseSaga(action){
  //us try/catch for errors - replaces promise .then & .catch
  try {
    const response = yield axios.get('/api/house/');
    let activeMember = []
    // take the ProPublica member data and convert the numeric district strings into numbers, 
    // unless they're not numbers, then leave them as they are
    response.data.results[0].members.map((member)=> Number(member.district) ? member.district = Number(member.district):'')
    // check all members listed to make sure they are active before adding them to the reducer store
    response.data.results[0].members.map((member) => member.in_office ? activeMember.push(member):'');
    yield put({ type: 'SET_HOUSE', payload: activeMember});
    console.log('putting this in the house reducer:', response.data.results[0].members)
  } catch (error) {
      console.log('error with house get request', error);
  }
}

function* houseSaga() {
  yield takeLatest('GET_HOUSE', getHouseSaga);
}

export default houseSaga;