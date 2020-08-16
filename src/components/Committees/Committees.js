import React, { Component } from 'react';
import {connect} from 'react-redux';
import { sortBy } from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const listStyle = {
  height: '100px',
  width: '82px',
  borderRadius: '10px',
}

const paperHolder = {
  marginTop: '40px',
  padding: 15,
  textAlign: 'center',
  backgroundColor: '#ead7aa',
  border: '1px solid #60563a'
}

class Committees extends Component {

  handleCommitteeClick = (chamber, id) => {
    this.props.history.push('/Committees/' + chamber + '/' + id)
  }

  render() {
    
    if (this.props.committees.senateCommittees === undefined) return null;
    if (this.props.committees.houseCommittees === undefined) return null;
    if (this.props.committees.jointCommittees === undefined) return null;
    return(
      <>
        <Paper style={paperHolder}>
          <Typography variant='h4'>Senate Committees</Typography>
          {/* {JSON.stringify(this.props.committees.senateCommittees.committees)} */}
          <List>
            {this.props.committees.senateCommittees.map((committee, index) => (
              <ListItem button key={index} onClick={()=>this.handleCommitteeClick(committee.chamber, committee.id)}>
                <Typography variant='body1'>
                  {committee.name}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Typography variant='h4'>House Committees</Typography>
          <List>
            {this.props.committees.houseCommittees.map((committee, index) => (
              <ListItem button key={index} onClick={()=>this.handleCommitteeClick(committee.chamber, committee.id)}>
                <Typography variant='body1'>
                  {committee.name}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Typography variant='h4'>Joint Committees</Typography>
          <List>
            {this.props.committees.jointCommittees.map((committee, index) => (
              <ListItem button key={index} onClick={()=>this.handleCommitteeClick(committee.chamber, committee.id)}>
                <Typography variant='body1'>
                  {committee.name}
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
  committees: state.committees,
});


export default connect(mapStateToProps)(Committees);