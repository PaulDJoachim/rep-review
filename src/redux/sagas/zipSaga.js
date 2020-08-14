import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';


function* updateZipSaga(action){
  try {
    console.log('action.payload for zip is:', action.payload);
    const response = yield axios.put('/api/zip/', {zip: action.payload});
    yield put({ type: 'FETCH_USER'});
    console.log('sending zipcode to database & reducer:', action.payload)
  } catch (error) {
      console.log('error with zip update', error);
  }
}

function* zipSaga() {
  yield takeLatest('UPDATE_USER_ZIP', updateZipSaga);
}

export default zipSaga;