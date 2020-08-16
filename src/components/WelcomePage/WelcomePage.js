import React, { Component } from 'react';
import {connect} from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import background from './generic-avatar.png';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
  marginRight: '10px',
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  List: {
    minWidth: '350px',
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid #60563a'
  },
  paperHolder: {
    marginTop: '40px',
    padding: theme.spacing.unit * 5,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#ead7aa',
    border: '1px solid #60563a'
  },
  listPaper: {
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '1px',
  },
});


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

  componentDidMount() {
    if (this.props.user.zip !== undefined){
      if (this.props.user.zip.length === 5){
        this.setState({haveZip: true})
    }}
    if (this.props.user.zip !== undefined && this.props.user.zip !== null){
      if (this.props.user.zip.length === 5){
        this.setState({haveZip: true})
        this.props.dispatch({type: 'GET_DISTRICT', payload: this.props.user.zip})
    }}
  }
  componentDidUpdate(prevProps) {
    if (this.props.user.zip !== undefined && this.props.user.zip !== null){
      if (this.props.user.zip !== prevProps.user.zip) {
        if (this.props.user.zip.length === 5){
          this.setState({haveZip: true})
          this.props.dispatch({type: 'GET_DISTRICT', payload: this.props.user.zip})
    }}}
  }

  handleMemberClick = (id) => {
    this.props.history.push('/Members/' + id)
  }

  render() {
    const { classes } = this.props;
    const yourHouseRep = this.props.house.filter(person => person.state === this.props.district.state && Number(person.district) === Number(this.props.district.district));
    const yourSenateRep = this.props.senate.filter(person => person.state === this.props.district.state);
    return (
      <div>
        <Paper className={classes.paperHolder}>
        <Paper className={classes.paper}>
          <Typography variant="h4">Welcome To Rep-Review!</Typography>
          <Typography variant="body1">Here you can find information about all 535 members of congress as well as congressional committees, current bills, and voting records.</Typography>
          
          <Typography variant="body1">Use the sidebar to browse categories, or log in to get information about your state representatives.</Typography>
        </Paper>
       {/* <Typography variant="body1">{JSON.stringify(this.props.house)}</Typography> */}
        <div>
          {this.props.user.id ? 
            <>
            <Paper className={classes.paper}>
              <FormControl>
                {!this.props.user.zip ? 
                  <Typography variant="h6">Enter your zip code for the latest information from your house and senate representatives.</Typography>
                :
                  <Typography variant="body1">Your Zip Code is {this.props.user.zip}</Typography>
                }
                <TextField
                  onChange={this.handleZipChange}
                  error={this.state.invalidZip}
                  id="standard-error-helper-text"
                  label="Zip Code"
                  value={this.state.zip}
                  variant="outlined"
                  style={{marginBottom: 10}}
                  // helperText="Incorrect entry."
                />
                {/* <label for="zip">Zip Code:</label><br />
                <input type="text" id='zip'></input>
                <input type="submit" value="Submit"></input> */}
              <Button onClick={this.handleZipSubmit} variant="contained" color="primary">
                Submit
              </Button>
              </FormControl>
            </Paper>
            </>
            :
            <Paper className={classes.paper}> 
              <Typography variant="h5"> Log in to get recent news about your state and representatives. </Typography>
            </Paper>
          }
        </div>
        {this.props.user.zip ?
          <div className={classes.root}>
            <Grid container xs={12}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Your Senators:</Typography>
                <List className={classes.List}>
                  {yourSenateRep.map((person, index) => (
                    <Paper className={classes.listPaper}>
                      <ListItem button key={index} onClick={()=>this.handleMemberClick(person.id)}>
                        <div style={placeholder}>
                          <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`} />
                        </div>
                        <Typography variant="h6">
                          {person.first_name} {person.last_name} - {person.party}
                        </Typography>
                      </ListItem>
                    </Paper>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Your Representative for District {this.props.district.district}:</Typography>
                <List className={classes.List}>
                  {yourHouseRep.map((person, index) => (
                    <Paper className={classes.listPaper}>
                      <ListItem button key={index} onClick={()=>this.handleMemberClick(person.id)}>
                        <div style={placeholder}>
                          <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`} />
                        </div>
                        <ListItemText>
                          District: {person.district} <br />
                          {person.first_name} {person.last_name} - {person.party}
                        </ListItemText>
                      </ListItem>
                    </Paper>
                  ))}
                </List>
              </Grid>
            </Grid>
          </div>
        :
          <Typography variant="body1"></Typography>
        }
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
  house: state.house,
  user: state.user,
  district: state.district,
  senate: state.senate,
  house: state.house,
  classes: PropTypes.object.isRequired,
});

export default connect(mapStateToProps)(withStyles(styles)(WelcomePage));

