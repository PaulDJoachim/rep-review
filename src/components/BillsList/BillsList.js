import React, { Component } from 'react';
import {connect} from 'react-redux';
import { sortBy } from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


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

class BillsList extends Component {

  // componentDidMount() {
  //   this.props.dispatch({type:'GET_RECENT_BILLS'});
  // }

  handleBillClick = (id) => {
    this.props.history.push('/Bills/' + id)
  }

  render() {
    
    if (this.props.bills === undefined) return null;
    return(
      <>
        <Paper style={paperHolder}>
          <Typography variant='h4'>Recent Bills</Typography>
          {/* {JSON.stringify(this.props.bills)} */}
          <List>
            {this.props.bills.map((bill, index) => (
              <ListItem button key={index} onClick={()=>this.handleBillClick(bill.bill_slug)}>
                <ListItemText>
                  {bill.number} <br />
                  {bill.title} <br />
                  Last Update: {bill.latest_major_action_date}
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
  bills: state.bills.recentBills
});


export default connect(mapStateToProps)(BillsList);