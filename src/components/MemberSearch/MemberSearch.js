import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Route, withRouter} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import background from './generic-avatar.png';

const paperHolder = {
  marginTop: '40px',
  padding: 15,
  textAlign: 'center',
  backgroundColor: '#ead7aa',
  border: '1px solid #60563a'
}
const paper = {
  padding: 10,
  textAlign: 'center',
  border: '1px solid #60563a'
}
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

let searchResult = [];
class MemberSearch extends Component {
  state = {
    hasSearched: false,
    search: '',
    lastSearch: ''
  }

  handleSelectState = (event) =>{
    const stateName = event.target.innerText
    const abbr = stateAbbr[stateName]
    // console.log(event.target.innerText)
    this.props.history.push('/Search/'+ abbr)
  }

  handleMemberClick = (id) => {
    this.props.history.push('/Members/' + id)
  }

  handleSearchChange = (event) => {
    this.setState({search: event.target.value})
  }

  handleSearch = () => {
    this.setState({hasSearched: true, lastSearch: this.state.search})
    const houseSearchFull = this.props.house.filter(person => `${person.first_name.toLowerCase()} ${person.last_name.toLowerCase()}`=== this.state.search.toLowerCase());
    const senateSearchFull = this.props.senate.filter(person => `${person.first_name.toLowerCase()} ${person.last_name.toLowerCase()}`=== this.state.search.toLowerCase());
    const houseSearchPartial = this.props.house.filter(person => person.last_name.toLowerCase() === this.state.search.toLowerCase() || person.first_name.toLowerCase() === this.state.search.toLowerCase());
    const senateSearchPartial = this.props.senate.filter(person => person.last_name.toLowerCase() === this.state.search.toLowerCase() || person.first_name.toLowerCase() === this.state.search.toLowerCase());
    searchResult = houseSearchFull.concat(senateSearchFull,houseSearchPartial,senateSearchPartial)
    this.setState({search: ''})
  }

  render() {
    
    let states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
    return (
      <div>
        {/* {JSON.stringify(searchResult)} */}
        <Paper style={paperHolder}>
          <Typography variant='h4' style={{marginBottom:10}}>Search Members of Congress</Typography>
          <Paper style={paper}>
            <FormControl>
              <TextField 
                variant='outlined'
                onChange={this.handleSearchChange}
                label="Enter First/Last Names"
                value={this.state.search}
              />
              <Button onClick={this.handleSearch} style={{marginTop: 15}} variant="contained" color="primary">
                Search
              </Button>
            </FormControl>
          </Paper>
          {this.state.hasSearched?
          <>
            <Typography variant='h4'>Names Including "{this.state.lastSearch}"</Typography>
            <List>
              {searchResult.map((person, index) => (
                <ListItem button key={index} onClick={()=>this.handleMemberClick(person.id)}>
                    <div style={placeholder}>
                      <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`} />
                    </div>
                  <a style={{ textDecoration: 'none' }} href={person.url}>
                    <ListItemText>
                      <Typography variant='h4'>{person.first_name} {person.last_name}</Typography> {person.party === 'D'?'Democratic':person.party==='R'?'Republican':'Libertarian'} {person.title}, {person.state}  <br />
                    </ListItemText>
                  </a>
                </ListItem>
              ))}
            </List>
          </>
          :
          <div />
          }
        </Paper>
        <Paper style={paperHolder}>
        <Typography variant="h4">Select a state to view representatives</Typography>
          <List>
          {states.map((state, id)=>(
            <ListItem button key={id} onClick={this.handleSelectState}>
              <Typography variant="h6">
                {state}
              </Typography>
            </ListItem>
          ))}
          </List>
        </Paper>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  stateReps: state.stateReps,
  house: state.house,
  senate: state.senate
});

export default withRouter(connect(mapStateToProps)(MemberSearch));

const stateAbbr = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'American Samoa': 'AS',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'District Of Columbia': 'DC',
  'Federated States Of Micronesia': 'FM',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Guam': 'GU',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Marshall Islands': 'MH',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Northern Mariana Islands': 'MP',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Palau': 'PW',
  'Pennsylvania': 'PA',
  'Puerto Rico': 'PR',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virgin Islands': 'VI',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY'
  }