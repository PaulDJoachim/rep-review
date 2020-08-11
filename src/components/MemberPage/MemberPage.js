import React, { Component } from 'react';
import {connect} from 'react-redux';
import background from '../StatePage/generic-avatar.png';
import BookmarkButton from '../BookmarkButton/BookmarkButton'

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
    // console.log(this.props.activeMember)
    // console.log('these are the props on the member page:', this.props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.props.dispatch({type:'CLEAR_MEMBER'});
      this.props.dispatch({type:'CLEAR_BIO'});
      this.props.dispatch({type:'GET_MEMBER', payload: this.props.match.params.memberId});
    }
  }

  render() {
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
        <h2>Committes</h2>
        <ul>
        {this.props.member.roles[0].committees.map((committe)=>(
        <li>{committe.title} of {committe.name}</li>))}
        </ul>
        {JSON.stringify(this.props.member.roles[0].committees)}
        <BookmarkButton />
      </>
    )
  } 

}

const mapStateToProps = state => ({
  errors: state.errors,
  member: state.member,
  activeMember: state.activeMember,
  bio: state.bio,
  user: state.user,
});


export default connect(mapStateToProps)(MemberPage);
