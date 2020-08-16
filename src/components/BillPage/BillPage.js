import React, { Component } from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

const paperHolder = {
  marginTop: '40px',
  padding: 15,
  textAlign: 'center',
  backgroundColor: '#ead7aa',
  border: '1px solid #60563a'
}

const paper ={
  padding: 10,
  textAlign: 'left',
  border: '1px solid #60563a'
}

class CommitteePage extends Component {

  state = {
    collapseBill: false,
  }

  componentDidMount() {
    this.props.dispatch({type:'CLEAR_BILL_INFO'});
    this.props.dispatch({type:'GET_BILL_INFO', payload: this.props.match.params.billId});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.dispatch({type:'GET_BILL_INFO', payload: this.props.match.params.billId});
    }
  }

  handleBillCollapse = () => {
    this.setState(state => ({ collapseBill: !state.collapseBill }));
  };

  render() {
    const bill = this.props.bill;
    if (bill === undefined) return null;
    if (bill.actions === undefined) return null;
    return(
      <>
        <Paper style={paperHolder}>
          <Paper style={paper}>
            <Typography variant="h5">{bill.bill}</Typography>
            <Typography variant="h6">Latest Activity: {bill.latest_major_action_date}</Typography>
            <Typography variant="h6">{bill.title}</Typography>
            <Typography variant="body1">{bill.summary}</Typography>
            <Typography variant="h6"><a href={bill.congressdotgov_url + '/text'}>Read the Text</a></Typography>
          </Paper>
        </Paper>
        <Paper style={paperHolder}>
        <ListItem button onClick={this.handleBillCollapse}>
          <Typography variant="h5">Actions</Typography>
        </ListItem>
        <List>
          <div style={{display:'flex'}}>
            <Collapse in={this.state.collapseBill}>
              {this.props.bill.actions.map((action, index) => (
                <Paper style={paper}>
                <Typography variant="h6">Date: {action.datetime}</Typography>
                <Typography variant="h6">Chamber: {action.chamber}</Typography>
                <Typography variant="h6">Action Type: {action.action_type}</Typography>
                <Typography variant="body1">{action.description}</Typography>
                </Paper>
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
  committee: state.committees.committee,
  bill: state.bills.billInfo
});


export default connect(mapStateToProps)(CommitteePage);

