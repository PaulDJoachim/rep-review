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
    padding: 10,
    textAlign: 'left',
    border: '1px solid #60563a'
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
    marginBottom: '20px',
    textAlign: 'left',
  },
  spacer: {
    marginTop: '20px',
  },
  leftAlign: {
    textAlign: 'left',
  },
  paperHolder: {
    marginTop: '20px',
    padding: 15,
    textAlign: 'left',
    backgroundColor: '#ead7aa',
    border: '1px solid #60563a'
  },
  hover: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'white'
   }
  }
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
      <Paper className={classes.paperHolder}>
        <div className={classes.spacer} />
        <Paper className={classes.paper}>
          <Grid container>
            <Grid className={classes.pic} item xs={12} md={3}>
              <div style={placeholder}>
                <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${member.id}.jpg`} />
              </div>
              <Typography variant="h5">Contact Information</Typography>
              <Typography variant="body2">Phone: {member.roles[0].phone}</Typography>
              <Typography variant="body2">Office: {member.roles[0].office}</Typography><br />
            </Grid>
            <Grid className={classes.leftAlign} item xs={12} md={8}>
              <Grid container item justify="space-between">
                <Typography variant="h4" style={{paddingLeft:'10px',textAlign:'left'}}>{member.first_name} {member.last_name}
                <Typography style={{textAlign: 'left'}} variant='h6'>{member.roles[0].party === 'D'?'Democratic':member.roles[0].party ==='R'?'Republican':'Libertarian'} {member.roles[0].chamber==='House'?'House Member':'Senator'}</Typography></Typography>
                <BookmarkButton />
              </Grid>
              <Typography variant="h6" style={{paddingLeft:'10px'}}><a href={member.url}>{member.url}</a></Typography>
              <Typography variant="body1">{this.props.bio.extract}</Typography> <br />
            </Grid>
          </Grid>
        </Paper>
      </Paper>
      <Paper className={classes.paperHolder}>
        <ListItem button onClick={this.handleStatementCollapse}>
          <Typography variant="h5">Recent Statements</Typography>
        </ListItem>
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
      </Paper>
      <Paper className={classes.paperHolder}>
        <ListItem button onClick={this.handleBillCollapse}>
          <Typography variant="h5">Recent Bills Introduced</Typography>
        </ListItem>
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
      </Paper>
      <Paper className={classes.paperHolder}>
        <ListItem onClick={this.handleVoteCollapse} button>
          <Typography variant="h5">Recent Voting History</Typography>
        </ListItem>
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
      </Paper>
      <Paper className={classes.paperHolder}>
        <ListItem onClick={this.handleCommitteeCollapse} button>
          <Typography variant="h5">Committe Memberships</Typography>
        </ListItem>
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
      </Paper>
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
