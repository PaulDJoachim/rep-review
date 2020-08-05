import React, { Component } from 'react';
import {connect} from 'react-redux';
import { sortBy } from 'lodash';
import background from './generic-avatar.png';

class StatePage extends Component {

// const StatePage = (match) => {
//   return(
//   <h1>HELLO {match.match.params.stateName}</h1>

  render() {
    // thisStateHouse/Senate are filtered arrays with only the congress members form this state
    const thisStateHouse = this.props.house.filter(person => person.state === this.props.match.params.stateName);
    const thisStateSenate = this.props.senate.filter(person => person.state === this.props.match.params.stateName);
    const newArr = sortBy(thisStateHouse, 'district', function(n) {
      return Math.sin(n);
    });

    const listStyle = {
      height: '100px',
      width: '82px'
    }
    // const background = require(`./generic-avatar.png`);
    const placeholder = {
      height: '100px',
      width: '82px',
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }

    return(
      <>
        <h1>{stateAbbrToName[this.props.match.params.stateName]}</h1>
        <h2>Senate Members</h2>
        <ul>
          {thisStateSenate.map((person, index) => (
            <li key={index}>
              <div style={placeholder}>
                <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`} />
              </div>
              {person.first_name} {person.last_name}
            </li>
          ))}
        </ul>
        <h2>House Members</h2>
        <ul>
          {newArr.map((person, index) => (
            <li key={index}>
              <div style={placeholder}>
                <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`} />
              </div>
              District: {person.district}, {person.first_name} {person.last_name} - {person.party}
            </li>
          ))}
        </ul>
      </>
    )
  } 

}


const mapStateToProps = state => ({
  errors: state.errors,
  house: state.house,
  senate: state.senate,
});


export default connect(mapStateToProps)(StatePage);

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