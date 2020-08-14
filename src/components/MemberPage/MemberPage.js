import React, { Component } from 'react';
import {connect} from 'react-redux';
import background from '../StatePage/generic-avatar.png';
import BookmarkButton from '../BookmarkButton/BookmarkButton'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const listStyle = {
  height: '275px',
  width: '225px',
  borderRadius: '10px',
}

const placeholder = {
  height: '275px',
  width: '225px',
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  borderRadius: '10px',
}

class MemberPage extends Component {
  componentDidMount() {
    this.props.dispatch({type:'CLEAR_MEMBER'});
    this.props.dispatch({type:'CLEAR_BIO'});
    this.props.dispatch({type:'GET_MEMBER', payload: this.props.match.params.memberId});
    this.props.dispatch({type:'GET_MEMBER_STATEMENTS', payload: this.props.match.params.memberId});
    this.props.dispatch({type:'GET_MEMBER_BILLS', payload: this.props.match.params.memberId});
    this.props.dispatch({type:'GET_MEMBER_VOTES', payload: this.props.match.params.memberId});
    // console.log(this.props.activeMember)
    // console.log('these are the props on the member page:', this.props);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.props.dispatch({type:'CLEAR_MEMBER'});
      this.props.dispatch({type:'CLEAR_BIO'});
      this.props.dispatch({type:'GET_MEMBER', payload: this.props.match.params.memberId});
      this.props.dispatch({type:'GET_MEMBER_STATEMENTS', payload: this.props.match.params.memberId});
      this.props.dispatch({type:'GET_MEMBER_BILLS', payload: this.props.match.params.memberId});
      this.props.dispatch({type:'GET_MEMBER_VOTES', payload: this.props.match.params.memberId});
    }
  }

  handleCommitteeClick = (chamber, id) => {
    this.props.history.push('/Committees/' + chamber + '/' + id)
  }

  handleVoteClick = (chamber, session, rollCall) => {
    this.props.history.push('/Votes/' + chamber + '/' + session + rollCall)
  }

  handleBillClick = (id) => {
    this.props.history.push('/Bills/' + id)
  }

  render() {
    let chamber = '2';
    const member = this.props.member;
    if (member.roles === undefined) return null;
    return(
      <>
        <div style={placeholder}>
          <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${member.id}.jpg`} />
        </div>
        <h1>{member.first_name} {member.last_name} - {member.roles[0].party}</h1>
        <h4>{this.props.bio.extract}</h4>
        <h2>Website: <a href={member.url}>{member.url}</a></h2>
        <h2>Phone: {member.roles[0].phone}</h2>
        <h2>Office: {member.roles[0].office}</h2>
        <h2>Recent Statements:</h2>
        <List>
          {this.props.statements.map((statement, index) => (
            <a style={{ textDecoration: 'none' }} href={statement.url}>
              <ListItem button key={index + 's'}>
                <ListItemText key={index + 's'}>
                  {statement.date} <br />
                  {statement.title}
                </ListItemText>
              </ListItem>
            </a>
          ))}
        </List>
        <h2>Recent Bills Introduced:</h2>
        <List>
          {this.props.bills.map((bill, index) => (
              <ListItem button key={index + 'b'} onClick={()=>this.handleBillClick(bill.bill_id.slice(0, -4))}>
                <ListItemText key={index + 'b'}>
                  {bill.introduced_date} <br />
                  {bill.number} <br />
                  {bill.title}
                </ListItemText>
              </ListItem>
          ))}
        </List>
        <h2>Recent Voting History:</h2>
        <List>
          {this.props.votes.map((vote, index) => (
              <ListItem button key={index + 'v'} onClick={()=>this.handleVoteClick(vote.chamber, vote.session, vote.roll_call)}>
                <ListItemText key={index + 'v'}>
                  {vote.date} <br />
                  Roll Call: {vote.roll_call} <br />
                  {vote.description} <br />
                  {vote.position}
                </ListItemText>
              </ListItem>
          ))}
        </List>
        <h2>Committes</h2>
        <List>
          {this.props.member.roles[0].committees.map((committee, index) => (
            <ListItem button key={index} onClick={()=>this.handleCommitteeClick(committee.chamber, committee.code)}>
              <ListItemText key={index}>
                {committee.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        {/* {JSON.stringify(this.props.member.roles[0].committees)} */}
        <BookmarkButton />
      </>
    )
  } 

}

const mapStateToProps = state => ({
  errors: state.errors,
  member: state.member,
  bio: state.bio,
  user: state.user,
  statements: state.statements.memberStatements,
  bills: state.bills.memberBills,
  votes: state.votes.memberVotes,
});


export default connect(mapStateToProps)(MemberPage);
