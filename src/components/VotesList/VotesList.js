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



class votesList extends Component {

  // componentDidMount() {
  //   this.props.dispatch({type:'GET_RECENT_VOTES'});
  // }

  handleVoteClick = (chamber, session, id) => {
    this.props.history.push('/Votes/' + chamber + '/' + session + id)
  }

  render() {
    
    if (this.props.votes === undefined) return null;
    return(
      <>
        <h2>Recent Votes</h2>
        {/* {JSON.stringify(this.props.votes)} */}
        <List>
          {this.props.votes.map((vote, index) => (
            <ListItem button key={index} onClick={()=>this.handleVoteClick(vote.chamber, vote.session, vote.roll_call)}>
              <ListItemText>
                {/* {JSON.stringify(vote)}
                {vote.bill.number} <br /> */}
                Session: {vote.session} Roll Call: {vote.roll_call} <br />
                {vote.description} <br />
                {vote.result}
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
  votes: state.votes.recentVotes
});


export default connect(mapStateToProps)(votesList);