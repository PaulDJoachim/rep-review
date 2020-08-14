import React, { Component } from 'react';
import {connect} from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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



class WelcomePage extends Component {

  // filterByState = () => {
  //   let allHouseMembers = this.props.house.members;
  //   let stateHouseMembers = []
  //   for (i=0;i<allHouseMembers.length;i++) {
  //     if (allHouseMembers.state === 'TX') {
  //     }
  //   }
  // }

  state = {
    zip: '',
    invalidZip: false,
    haveZip: false,
  }

  handleZipChange = (event) => {
    console.log(event.target.value)
    if (!isNaN(event.target.value) && event.target.value.length < 6){
      this.setState({zip: event.target.value})
    }
  }

  handleZipSubmit = (event) => {
    if (this.state.zip.length === 5) {
      this.props.dispatch({type: 'UPDATE_USER_ZIP', payload: this.state.zip})
      this.props.dispatch({type: 'GET_DISTRICT', payload: this.state.zip})
        this.setState({
          invalidZip: false,
          zip: ''  
        })
    } else {this.setState({invalidZip: true})}
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.zip !== prevProps.user.zip) {
      if (this.props.user.zip.length === 5){
        this.setState({haveZip: true})
        this.props.dispatch({type: 'GET_DISTRICT', payload: this.props.user.zip})
    }} 
  }

  render() {
    const yourHouseRep = this.props.house.filter(person => person.state === this.props.district.state && Number(person.district) === Number(this.props.district.district));
    const yourSenateRep = this.props.senate.filter(person => person.state === this.props.district.state);
    return (
      <div>
        <h2>Welcome To Rep-Review!</h2>
        <p>Here you can find information about all 535 members of congress as well as congressional committees, current bills, and voting records.</p>
        <p>Use the sidebar to browse categories, or log in to get information about your state representatives.</p>
       {/* <p>{JSON.stringify(this.props.house)}</p> */}
        <div>
          {this.props.user.id ? 
            <>
            <FormControl> 
              <h4>Enter your zip code for the latest information from your house and senate representatives.</h4>
              <p>Your Zip Code is {this.props.user.zip}</p>
              <TextField
                onChange={this.handleZipChange}
                error={this.state.invalidZip}
                id="standard-error-helper-text"
                label="Zip Code"
                value={this.state.zip}
                // helperText="Incorrect entry."
              />
              {/* <label for="zip">Zip Code:</label><br />
              <input type="text" id='zip'></input>
              <input type="submit" value="Submit"></input> */}
            <Button onClick={this.handleZipSubmit} variant="contained" color="primary">
              Submit
            </Button>
            </FormControl>
            </>
            : 
            <h3> Log in to get recent news about your state and representatives. </h3>
          }
        </div>
        {this.state.haveZip ?
          <>
            <h2>Your Senators:</h2>
            <List>
              {yourSenateRep.map((person, index) => (
                <ListItem button key={index} onClick={()=>this.handleMemberClick(person.id, person.first_name, person.last_name)}>
                  <div style={placeholder}>
                    <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`} />
                  </div>
                  <ListItemText>
                    {person.first_name} {person.last_name} - {person.party}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
              <h2>Your Representative for District {this.props.district.district}:</h2>
              {JSON.stringify(yourHouseRep)}
              <List>
                {yourHouseRep.map((person, index) => (
                  <ListItem button key={index} onClick={()=>this.handleMemberClick(person.id, person.first_name, person.last_name)}>
                    <div style={placeholder}>
                      <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`} />
                    </div>
                    <ListItemText>
                      District: {person.district} <br />
                      {person.first_name} {person.last_name} - {person.party}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
          </>
        :
          <p>nothing</p>
        }
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  house: state.house,
  user: state.user,
  district: state.district,
  senate: state.senate,
  house: state.house,
});

export default connect(mapStateToProps)(WelcomePage);

