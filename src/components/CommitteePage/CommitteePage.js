import React, { Component } from 'react';
import {connect} from 'react-redux';

import background from './generic-avatar.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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
}

class CommitteePage extends Component {
  componentDidMount() {
    const chamber = this.props.location.pathname.slice(12, this.props.location.pathname.length - 5);
    const committeeId = this.props.location.pathname.slice(-4);
    this.props.dispatch({type:'CLEAR_COMMITTEE'});
    this.props.dispatch({type:'CLEAR_COMMITTEE_INFO'});
    this.props.dispatch({type:'GET_COMMITTEE', payload: [chamber, committeeId]});
  }

  // componentDidUpdate(prevProps) {
  //   const chamber = this.props.location.pathname.slice(12, this.props.location.pathname.length - 5);
  //   const committeeId = this.props.location.pathname.slice(-4);
  //   if (prevProps !== this.props) {
  //     this.props.dispatch({type:'GET_COMMITTEE', payload: [chamber, committeeId]});
  //   }
  // }

  handleMemberClick = (id) => {
    this.props.history.push('/Members/' + id)
  }

  render() {
    const committee = this.props.committee;
    const info = this.props.info;
    if (committee.current_members === undefined) return null;
    return(
      <>
        <h1>{committee.name}</h1>
        <h2>Website: <a href={committee.url}>{committee.url}</a></h2>
        <p>{info.extract}</p>
        <h2>Members</h2>
        <List>
          {this.props.committee.current_members.map((person, index) => (
            <ListItem button key={index} onClick={()=>this.handleMemberClick(person.id)}>
              <div style={placeholder}>
                <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`} />
              </div>
              <ListItemText>
                {person.name} - {person.party} <br />
                {stateAbbrToName[person.state]}<br />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </>
    )
  } 

}

const mapStateToProps = state => ({
  errors: state.errors,
  committee: state.committees.committee,
  info: state.committees.info,
});


export default connect(mapStateToProps)(CommitteePage);


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