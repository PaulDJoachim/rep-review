import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getBillsSaga(action){
  try {
    const response = yield axios.get('/api/bills/recent/');
    yield put({ type: 'SET_RECENT_BILLS', payload: response.data.results[0].bills});
    console.log('putting this in the recent bills reducer:', response.data.results[0].bills)
  } catch (error) {
      console.log('error with recent bills get request', error);
  }
}

function* getBillInfoSaga(action){
  try {
    const response = yield axios.get('/api/bills/info/' + action.payload);
    yield put({ type: 'SET_BILL_INFO', payload: response.data.results[0]});
    console.log('putting this in the bill info reducer:', response.data.results[0])
  } catch (error) {
      console.log('error with bill info get request', error);
  }
}

function* getMemberBillsSaga(action){
  try {
    const response = yield axios.get('/api/member/bills/' + action.payload);
    yield put({ type: 'SET_MEMBER_BILLS', payload: response.data.results[0].bills});
    console.log('putting this in member bills reducer:', response.data.results[0].bills)
  } catch (error) {
      console.log('error with member bills get request', error);
  }
}



function* billSaga() {
  yield takeLatest('GET_RECENT_BILLS', getBillsSaga);
  yield takeLatest('GET_BILL_INFO', getBillInfoSaga);
  yield takeLatest('GET_MEMBER_BILLS', getMemberBillsSaga);
}

export default billSaga;