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



class BillsList extends Component {

  // componentDidMount() {
  //   this.props.dispatch({type:'GET_RECENT_BILLS'});
  // }

  handleCommitteeClick = (id) => {
    this.props.history.push('/Bills/' + id)
  }

  render() {
    
    if (this.props.bills === undefined) return null;
    return(
      <>
        <h2>Recent Bills</h2>
        {/* {JSON.stringify(this.props.bills)} */}
        <List>
          {this.props.bills.map((bill, index) => (
            <ListItem button key={index} onClick={()=>this.handleCommitteeClick(bill.id)}>
              <ListItemText>
                {bill.number} <br />
                {bill.title}
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
  bills: state.bills.recentBills
});


export default connect(mapStateToProps)(BillsList);