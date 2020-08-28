import React, { Component } from 'react';
import {connect} from 'react-redux';
import { sortBy } from 'lodash';

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

const paperHolder = {
  marginTop: '40px',
  padding: 15,
  textAlign: 'center',
  backgroundColor: '#ead7aa',
  border: '1px solid #60563a'
}

class votesList extends Component {

  // componentDidMount() {
  //   this.props.dispatch({type:'GET_RECENT_VOTES'});
  // }


  // Disabled until vote pages are be added
  // handleVoteClick = (chamber, session, rollCall) => {
  //   this.props.history.push('/Votes/' + chamber + '/' + session + rollCall)
  // }

  render() {
    
    if (this.props.votes === undefined) return null;
    return(
      <>
        <Paper style={paperHolder}>
          <Typography variant='h4'>Recent Votes</Typography>
          {/* {JSON.stringify(this.props.votes)} */}
          <List>
            {this.props.votes.map((vote, index) => (
              <ListItem button key={index} onClick={()=>this.handleVoteClick(vote.chamber, vote.session, vote.roll_call)}>
                <ListItemText>
                  {/* {JSON.stringify(vote)}
                  {vote.bill.number} <br /> */}
                  {vote.date} <br />
                  {vote.chamber} Roll Call: {vote.roll_call} <br />
                  {vote.description} <br />
                  {vote.result}
                </ListItemText>
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
  votes: state.votes.recentVotes
});


export default connect(mapStateToProps)(votesList);