import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getHouseCommitteesSaga(action){
  try {
    const response = yield axios.get('/api/committees/house/');
    yield put({ type: 'SET_HOUSE_COMMITTEES', payload: response.data.results[0]});
    console.log('putting this in the house committees reducer:', response.data.results[0].committees)
  } catch (error) {
      console.log('error with house committees get request', error);
  }
}

function* getSenateCommitteesSaga(action){
  try {
    const response = yield axios.get('/api/committees/senate/');
    yield put({ type: 'SET_SENATE_COMMITTEES', payload: response.data.results[0]});
    console.log('putting this in the senate committees reducer:', response.data.results[0].committees)
  } catch (error) {
      console.log('error with senate committees get request', error);
  }
}

function* getJointCommitteesSaga(action){
  try {
    const response = yield axios.get('/api/committees/joint/');
    yield put({ type: 'SET_JOINT_COMMITTEES', payload: response.data.results[0]});
    console.log('putting this in the joint committees reducer:', response.data.results[0].committees)
  } catch (error) {
      console.log('error with joint committees get request', error);
  }
}

function* committeeSaga() {
  yield takeLatest('GET_HOUSE_COMMITTEES', getHouseCommitteesSaga);
  yield takeLatest('GET_SENATE_COMMITTEES', getSenateCommitteesSaga);
  yield takeLatest('GET_JOINT_COMMITTEES', getJointCommitteesSaga);
}

export default committeeSaga;