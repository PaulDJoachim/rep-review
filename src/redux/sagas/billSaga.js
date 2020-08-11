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


function* billSaga() {
  yield takeLatest('GET_RECENT_BILLS', getBillsSaga);
}

export default billSaga;