import React, { Component } from 'react';
import {connect} from 'react-redux';




class VotePage extends Component {
  componentDidMount() {
    this.props.dispatch({type:'CLEAR_VOTE_INFO'});
    this.props.dispatch({type:'GET_VOTE_INFO', payload: this.props.location.pathname.slice(7)});
    // console.log(this.props.location.pathname.slice(7))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.dispatch({type:'GET_VOTE_INFO', payload: this.props.location.pathname.slice(7)});
    }
  }


  render() {
    const vote = this.props.vote;
    if (vote === undefined) return null;
    return(
      <>
        <h1>This is a vote page</h1>
        <h2>{vote.description}</h2>
      </>
    )
  } 

}

const mapStateToProps = state => ({
  errors: state.errors,
  committee: state.committees.committee,
  vote: state.votes.voteInfo
});


export default connect(mapStateToProps)(VotePage);

