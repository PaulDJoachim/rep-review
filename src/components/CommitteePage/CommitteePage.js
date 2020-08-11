import React, { Component } from 'react';
import {connect} from 'react-redux';


class CommitteePage extends Component {
  componentDidMount() {
    const chamber = this.props.location.pathname.slice(12, this.props.location.pathname.length - 5);
    const committeeId = this.props.location.pathname.slice(-4);
    this.props.dispatch({type:'CLEAR_COMMITTEE'});
    this.props.dispatch({type:'CLEAR_COMMITTEE_INFO'});
    this.props.dispatch({type:'GET_COMMITTEE', payload: [chamber, committeeId]});
  }

  // componentDidUpdate(prevProps) {
  //   const chamber = this.props.location.pathname.slice(12, this.props.location.pathname.length - 5);
  //   const committeeId = this.props.location.pathname.slice(-4);
  //   if (prevProps !== this.props) {
  //     this.props.dispatch({type:'GET_COMMITTEE', payload: [chamber, committeeId]});
  //   }
  // }

  render() {
    const committee = this.props.committee;
    const info = this.props.info;
    if (committee === undefined) return null;
    return(
      <>
        <h1>{committee.name}</h1>
        <h2>Website: <a href={committee.url}>{committee.url}</a></h2>
        <p>{info.extract}</p>
        {/* {JSON.stringify(this.props)} */}
        {/* {JSON.stringify(this.props.location.pathname)}
        {JSON.stringify(this.props.location.pathname.slice(12, this.props.location.pathname.length - 5))}
        {JSON.stringify(this.props.location.pathname.slice(-4))} */}
        {/* <div style={placeholder}>
          <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${member.id}.jpg`} />
        </div>
        <h1>{member.first_name} {member.last_name} - {member.roles[0].party}</h1>
        <h4>{this.props.bio.extract}</h4>
        <h2>Website: <a href={member.url}>{member.url}</a></h2>
        <h2>Phone: {member.roles[0].phone}</h2>
        <h2>Office: {member.roles[0].office}</h2>
        <h2>Committes</h2>
        <ul>
        {this.props.member.roles[0].committees.map((committe)=>(
        <li>{committe.title} of {committe.name}</li>))}
        </ul>
        {JSON.stringify(this.props.member.roles[0].committees)}
        <BookmarkButton /> */}
      </>
    )
  } 

}

const mapStateToProps = state => ({
  errors: state.errors,
  committee: state.committees.committee,
  info: state.committees.info,
});


export default connect(mapStateToProps)(CommitteePage);
