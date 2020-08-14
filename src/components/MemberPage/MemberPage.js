import React, { Component } from 'react';
import {connect} from 'react-redux';
import background from '../StatePage/generic-avatar.png';
import BookmarkButton from '../BookmarkButton/BookmarkButton'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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


const styles = theme => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  listPaper: {
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '1px',
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  pic: {
    minWidth: '225px',
    marginTop: '20px',
    marginBottom: '20px'
  },
  spacer: {
    marginTop: '20px',
  },
});

class MemberPage extends Component {

  state = {
    collapseVote: false,
    collapseBill: false,
    collapseStatement: false,
    collapseCommittee: false,
  }


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

  handleStatementCollapse = () => {
    this.setState(state => ({ collapseStatement: !state.collapseStatement }));
  };

  handleBillCollapse = () => {
    this.setState(state => ({ collapseBill: !state.collapseBill }));
  };

  handleVoteCollapse = () => {
    this.setState(state => ({ collapseVote: !state.collapseVote }));
  };

  handleCommitteeCollapse = () => {
    this.setState(state => ({ collapseCommittee: !state.collapseCommittee }));
  };

  render() {

    const { classes } = this.props;
    let chamber = '2';
    const member = this.props.member;
    if (member.roles === undefined) return null;
    return(
      <>
        <div className={classes.spacer} />
        <Paper className={classes.paper}>
          <Grid container>
            <Grid className={classes.pic} item xs={12} md={3}>
              <div style={placeholder}>
                <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${member.id}.jpg`} />
              </div>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h3">{member.first_name} {member.last_name} - {member.roles[0].party}</Typography>
              <Typography variant="body1">{this.props.bio.extract}</Typography> <br />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
        <Typography variant="h5">Contact Information</Typography>
        <Typography variant="h6">Website: <a href={member.url}>{member.url}</a></Typography>
        <Typography variant="h6">Phone: {member.roles[0].phone}</Typography>
        <Typography variant="h6">Office: {member.roles[0].office}</Typography><br />
        </Paper>
        <Typography variant="h5" onClick={this.handleStatementCollapse}>Recent Statements:</Typography>
        <List>
          <div className={classes.container}>
            <Collapse in={this.state.collapseStatement}>
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
            </Collapse>
          </div>
        </List>
        <Typography variant="h5" onClick={this.handleBillCollapse}>Recent Bills Introduced:</Typography>
        <List>
          <div className={classes.container}>
            <Collapse in={this.state.collapseBill}>
              {this.props.bills.map((bill, index) => (
                <ListItem button key={index + 'b'} onClick={()=>this.handleBillClick(bill.bill_id.slice(0, -4))}>
                  <ListItemText key={index + 'b'}>
                    {bill.introduced_date} <br />
                    {bill.number} <br />
                    {bill.title}
                  </ListItemText>
                </ListItem>
              ))}
            </Collapse>
          </div>
        </List>
        <Typography variant="h5" onClick={this.handleVoteCollapse}>Recent Voting History:</Typography>
        <List>
          <div className={classes.container}>
            <Collapse in={this.state.collapseVote}>
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
            </Collapse>
          </div>
        </List>
        <Typography variant="h5" onClick={this.handleCommitteeCollapse}>Committes</Typography>
        <List>
          <div className={classes.container}>
            <Collapse in={this.state.collapseCommittee}>
              {this.props.member.roles[0].committees.map((committee, index) => (
                <ListItem button key={index} onClick={()=>this.handleCommitteeClick(committee.chamber, committee.code)}>
                  <ListItemText key={index}>
                    {committee.name}
                  </ListItemText>
                </ListItem>
              ))}
            </Collapse>
          </div>
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
  classes: PropTypes.object.isRequired,
});


export default connect(mapStateToProps)(withStyles(styles)(MemberPage));
