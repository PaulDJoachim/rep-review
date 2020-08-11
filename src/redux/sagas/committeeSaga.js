import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getHouseCommitteesSaga(action){
  try {
    const response = yield axios.get('/api/committees/house/');
    yield put({ type: 'SET_HOUSE_COMMITTEES', payload: response.data.results[0].committees});
    console.log('putting this in the house committees reducer:', response.data.results[0].committees)
  } catch (error) {
      console.log('error with house committees get request', error);
  }
}

function* getSenateCommitteesSaga(action){
  try {
    const response = yield axios.get('/api/committees/senate/');
    yield put({ type: 'SET_SENATE_COMMITTEES', payload: response.data.results[0].committees});
    console.log('putting this in the senate committees reducer:', response.data.results[0].committees)
  } catch (error) {
      console.log('error with senate committees get request', error);
  }
}

function* getJointCommitteesSaga(action){
  try {
    const response = yield axios.get('/api/committees/joint/');
    yield put({ type: 'SET_JOINT_COMMITTEES', payload: response.data.results[0].committees});
    console.log('putting this in the joint committees reducer:', response.data.results[0].committees)
  } catch (error) {
      console.log('error with joint committees get request', error);
  }
}

function* getCommitteeSaga(action){
  try {
    const response = yield axios.get('/api/committees/' + action.payload[1] + action.payload[0]);
    yield put({ type: 'SET_COMMITTEE', payload: response.data.results[0]});
    console.log('putting this in the committee reducer:', response.data.results[0])
    const committee = response.data.results[0];

    // this section turns the committee names into wikipedia-friendly search strings
    // in order to get info about the committees
    let wikiQuery = '';
    if (committee.chamber === "Senate") {
      wikiQuery = "United_States_Senate_" + committee.name.replace(/ /g,"_");
    } else if (committee.chamber === "House") {
      wikiQuery = "United_States_House_" + committee.name.replace(/ /g,"_");
    } else if (committee.chamber === "Joint") {
      wikiQuery = "United_States_Congress_" + committee.name.replace(/ /g,"_");
    }
    yield put({ type: 'GET_COMMITTEE_INFO', payload: wikiQuery })
  } catch (error) {
      console.log('error with committee get request', error);
  }
}

function* getCommitteeInfoSaga(action){
  //us try/catch for errors - replaces promise .then & .catch
  try {
    const response = yield axios.get('/api/committees/info/' + action.payload);
    yield put({ type: 'SET_COMMITTEE_INFO', payload: response.data.query.pages[Object.keys(response.data.query.pages)[0]]});
    console.log('putting this in committee info reducer:', response.data.query.pages[Object.keys(response.data.query.pages)[0]])
  } catch (error) {
      console.log('error with committee info get request', error);
  }
}


function* committeeSaga() {
  yield takeLatest('GET_HOUSE_COMMITTEES', getHouseCommitteesSaga);
  yield takeLatest('GET_SENATE_COMMITTEES', getSenateCommitteesSaga);
  yield takeLatest('GET_JOINT_COMMITTEES', getJointCommitteesSaga);
  yield takeLatest('GET_COMMITTEE', getCommitteeSaga);
  yield takeLatest('GET_COMMITTEE_INFO', getCommitteeInfoSaga);
}

export default committeeSaga;