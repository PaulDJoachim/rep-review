import React, { Component } from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



class Bookmarks extends Component {

  componentDidMount() {
    this.props.dispatch({type:'GET_BOOKMARKS', payload: this.props.user.id});
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.props.dispatch({type:'GET_BOOKMARKS', payload: this.props.user.id});
    }
  }

  render() {
    if (this.props.bookmarks.length === 0) return null;
    return(
      <>
      <h1>This is the Bookmarks Page!</h1>
      {JSON.stringify(this.props.bookmarks)}
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
