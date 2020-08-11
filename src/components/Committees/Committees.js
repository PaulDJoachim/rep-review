import React, { Component } from 'react';
import {connect} from 'react-redux';
import { sortBy } from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



const listStyle = {
  height: '100px',
  width: '82px',
  borderRadius: '10px',
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
        <h2>Senate Committees</h2>
        {/* {JSON.stringify(this.props.committees.senateCommittees.committees)} */}
        <List>
          {this.props.committees.senateCommittees.map((committee, index) => (
            <ListItem button key={index} onClick={()=>this.handleCommitteeClick(committee.chamber, committee.id)}>
              <ListItemText>
                {committee.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <h2>House Committees</h2>
        <List>
          {this.props.committees.houseCommittees.map((committee, index) => (
            <ListItem button key={index} onClick={()=>this.handleCommitteeClick(committee.chamber, committee.id)}>
              <ListItemText>
                {committee.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <h2>Joint Committees</h2>
        <List>
          {this.props.committees.jointCommittees.map((committee, index) => (
            <ListItem button key={index} onClick={()=>this.handleCommitteeClick(committee.chamber, committee.id)}>
              <ListItemText>
                {committee.name}
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
  committees: state.committees,
});


export default connect(mapStateToProps)(Committees);