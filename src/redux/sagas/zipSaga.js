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
    // run a search for statements about the associated state
    // for display on welcome page
    yield put({ type: 'SEARCH_STATEMENTS', payload: stateAbbrToName[response.data.results[0].state]});
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

const stateAbbrToName = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AS": "American Samoa",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "DC": "District Of Columbia",
  "FM": "Federated States Of Micronesia",
  "FL": "Florida",
  "GA": "Georgia",
  "GU": "Guam",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MH": "Marshall Islands",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "MP": "Northern Mariana Islands",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PW": "Palau",
  "PA": "Pennsylvania",
  "PR": "Puerto Rico",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VI": "Virgin Islands",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming"
}