import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';


function* updateZipSaga(action){
  try {
    const response = yield axios.put('/api/zip/', {zip: action.payload});
    yield put({ type: 'FETCH_USER'});
    console.log('sending zipcode to database & reducer:', action.payload)
  } catch (error) {
      console.log('error with zip update', error);
  }
}

function* getDistrictSaga(action){
  try {
    console.log('action.payload for zip is:', action.payload);
    const response = yield axios.get('/api/zip/'+ action.payload);
    // only grabbing the first house representative [0]
    // there may be more than one depending on zip code / district overlaps
    yield put({ type: 'SET_DISTRICT', payload: response.data.results[0]});
    console.log('sending district rep to reducer:', response.data.results[0])
  } catch (error) {
      console.log('error getting district:', error);
  }
}

function* zipSaga() {
  yield takeLatest('UPDATE_USER_ZIP', updateZipSaga);
  yield takeLatest('GET_DISTRICT', getDistrictSaga);
}

export default zipSaga;