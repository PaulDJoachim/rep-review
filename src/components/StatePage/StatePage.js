import React, { Component } from 'react';
import {connect} from 'react-redux';
import { sortBy } from 'lodash';
import background from './generic-avatar.png';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const listStyle = {
  height: '100px',
  width: '82px',
  borderRadius: '10px',
}

const placeholder = {
  height: '100px',
  width: '82px',
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  borderRadius: '10px',
  marginRight: '15px'
}

const paperHolder = {
  marginTop: '40px',
  padding: 15,
  textAlign: 'center',
  backgroundColor: '#ead7aa',
  border: '1px solid #60563a'
}

class StatePage extends Component {

  handleMemberClick = (id) => {
    this.props.history.push('/Members/' + id)
  }

  render() {
    
    // thisStateHouse/Senate are filtered arrays with only the congress members form this state
    const thisStateHouse = this.props.house.filter(person => person.state === this.props.match.params.stateName);
    const thisStateSenate = this.props.senate.filter(person => person.state === this.props.match.params.stateName);
    const newArr = sortBy(thisStateHouse, 'district', function(n) {
      return Math.sin(n);
    });

    return(
      <>
      <Paper style={paperHolder}>
        <Typography variant="h2">{stateAbbrToName[this.props.match.params.stateName]}</Typography>
        <Typography variant="h5">Senate Members</Typography>
        <List>
          {thisStateSenate.map((person, index) => (
            <ListItem button key={index} onClick={()=>this.handleMemberClick(person.id)}>
              <div style={placeholder}>
                <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`} />
              </div>
              <Typography variant="h5">
                {person.first_name} {person.last_name} - {person.party}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Typography variant="h5">House Members</Typography>
        <List>
          {newArr.map((person, index) => (
            <ListItem button key={index} onClick={()=>this.handleMemberClick(person.id)}>
              <div style={placeholder}>
                <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`} />
              </div>
              <Typography variant="h5">
                District {person.district} <br />
                {person.first_name} {person.last_name} - {person.party}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
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