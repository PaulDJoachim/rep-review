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

  handleCommitteeClick = (id) => {
    this.props.history.push('/Committees/' + id)
  }

  render() {
    if (this.props.committees.senateCommittees.committees === undefined) return null;
    return(
      <>
        <h2>Senate Committees</h2>
        {/* {JSON.stringify(this.props.committees.senateCommittees.committees)} */}
        <List>
          {this.props.committees.senateCommittees.committees.map((committee, index) => (
            <ListItem button key={index} onClick={()=>this.handleCommitteeClick(committee.id)}>
              <ListItemText>
                {committee.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <h2>House Committees</h2>
        <List>
          {this.props.committees.houseCommittees.committees.map((committee, index) => (
            <ListItem button key={index} onClick={()=>this.handleCommitteeClick(committee.id)}>
              <ListItemText>
                {committee.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <h2>Joint Committees</h2>
        <List>
          {this.props.committees.jointCommittees.committees.map((committee, index) => (
            <ListItem button key={index} onClick={()=>this.handleCommitteeClick(committee.id)}>
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