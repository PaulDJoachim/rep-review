import React, { Component } from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import background from './generic-avatar.png';



const listStyle = {
  height: '100px',
  width: '82px',
  borderRadius: '10px',
}

const placeholder = {
  height: '100px',
  width: '82px',
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  borderRadius: '10px',
}



class Bookmarks extends Component {

  bookmarkArr = [];


  handleMemberClick = (id, firstName, lastName) => {
    this.props.history.push('/Members/' + id)
    this.props.dispatch({type: 'SET_ACTIVE_MEMBER', payload: firstName+'_'+lastName })
  }

  componentDidMount() {
    // this.props.dispatch({type:'CLEAR_BOOKMARKS'});
    this.props.dispatch({type:'GET_BOOKMARKS', payload: this.props.user.id});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      console.log('USER CHANGE DETECTED!!!!!!!')
      this.props.dispatch({type:'GET_BOOKMARKS', payload: this.props.user.id});

    }
    
  }

  render() {
    // check if the bookmarks have arrived and add only the member IDs to a new array
    if (this.props.bookmarks.length === 0) return null;
    if (this.props.bookmarks[0].url === undefined) return null;
    this.bookmarkArr = [];
    this.props.bookmarks.map((mark)=>(
    this.bookmarkArr.push(mark.url.slice(9))
    ))

    const memberArr = []
    // filter all house and senate reps flagged by the bookmarkArr into a new array containing their actual objects
    this.bookmarkArr.map((mark)=>{
      if (this.props.senate.filter(person => person.id === mark)[0] !== undefined){
      memberArr.push(this.props.senate.filter(person => person.id === mark)[0])}
      if (this.props.house.filter(person => person.id === mark)[0] !== undefined){
      memberArr.push(this.props.house.filter(person => person.id === mark)[0])}
    })



    return(
      <>
      <h1>{this.props.user.username}'s Bookmarks</h1>
        <List>
          {memberArr.map((person, index) => (
            <ListItem button key={index} onClick={()=>this.handleMemberClick(person.id, person.first_name, person.last_name)}>
              <div style={placeholder}>
                <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`} />
              </div>
              <ListItemText>
                {person.first_name} {person.last_name}
              </ListItemText>
            </ListItem>
          ))}
        </List>


      {/* {JSON.stringify(this.bookmarkArr)}
      {JSON.stringify(memberArr)} */}
      </>
    )
  } 

}


const mapStateToProps = state => ({
  errors: state.errors,
  house: state.house,
  senate: state.senate,
  user: state.user,
  bookmarks: state.bookmarks
});


export default connect(mapStateToProps)(Bookmarks);
