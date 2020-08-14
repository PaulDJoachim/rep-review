import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';


// Generate the current date in a format for ProPublica API query
const curday = function(sp){
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //As January is 0.
  let yyyy = today.getFullYear();
  
  if(dd<10) dd='0'+dd;
  if(mm<10) mm='0'+mm;
  return (yyyy+sp+mm+sp+dd);
};

function* getStatementsSaga(action){
  try {
    const response = yield axios.get('/api/statements/recent/'+ curday('-'));
    yield put({ type: 'SET_RECENT_STATEMENTS', payload: response.data.results});
    console.log('putting this in the recent statements reducer:', response.data.results)
  } catch (error) {
      console.log('error with recent statements get request', error);
  }
}

function* getMemberStatementsSaga(action){
  try {
    const response = yield axios.get('/api/member/statements/' + action.payload);
    yield put({ type: 'SET_MEMBER_STATEMENTS', payload: response.data.results});
    console.log('putting this in the member statements reducer:', response.data.results)
  } catch (error) {
      console.log('error with member get request', error);
  }
}


function* statementSaga() {
  yield takeLatest('GET_RECENT_STATEMENTS', getStatementsSaga);
  yield takeLatest('GET_MEMBER_STATEMENTS', getMemberStatementsSaga);
}

export default statementSaga;