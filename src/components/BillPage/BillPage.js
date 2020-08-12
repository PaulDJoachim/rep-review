import React, { Component } from 'react';
import {connect} from 'react-redux';




class CommitteePage extends Component {
  componentDidMount() {
    this.props.dispatch({type:'CLEAR_BILL_INFO'});
    this.props.dispatch({type:'GET_BILL_INFO', payload: this.props.match.params.billId});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.dispatch({type:'GET_BILL_INFO', payload: this.props.match.params.billId});
    }
  }


  render() {
    const bill = this.props.bill;
    if (bill === undefined) return null;
    return(
      <>
        <h1>{bill.bill}</h1>
        <h2>{bill.title}</h2>
        <h3>Latest Activity: {bill.latest_major_action_date}</h3>
        <p>{bill.summary}</p>
        <h3><a href={bill.congressdotgov_url + '/text'}>Read the Text</a></h3>
        
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

