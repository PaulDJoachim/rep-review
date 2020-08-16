import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
});

class ToggleButtons extends React.Component {
  state = {
  };

 componentDidMount() {
    // this.props.dispatch({type:'GET_BOOKMARKS', payload: this.props.user.id})
    // check if the user has this page bookmarked and toggle the bookmark state if so.
    // await this.props.dispatch({type:'GET_BOOKMARKS', payload: this.state.userId})
    // console.log('these are the bookmarks on componenetDidMount',this.props.bookmarks, this.props.location.pathname)
    this.props.bookmarks.map((mark)=>{
      if (mark.url === this.props.location.pathname){
        console.log('found match')
        this.setState({bookmarked: true});
      } 
    })
  }
  

  handleAddBookmark = (event, bookmarked) => {
    this.setState({ bookmarked });
    this.props.dispatch({type:'ADD_BOOKMARK', payload: [this.props.location.pathname, this.props.user.id]});
  };

  handleRemoveBookmark = (event, bookmarked) => {
    this.setState({bookmarked});
    this.props.dispatch({type:'REMOVE_BOOKMARK', payload: [this.props.location.pathname, this.props.user.id]});
  }

  render() {
    if (this.props.bookmarks === [{test:'object'}]) return null;
    const { classes } = this.props;
    const { bookmarked } = this.state;

    return (
        <>

            <ToggleButtonGroup value={bookmarked} exclusive >
              {this.state.bookmarked ? 
              <ToggleButton selected={true} value={false} onClick={this.handleRemoveBookmark}>
                <StarIcon />
              </ToggleButton>
              :
              <ToggleButton selected={false} value={true} onClick={this.handleAddBookmark}>
                <StarBorderIcon />
              </ToggleButton>}
            </ToggleButtonGroup>

          {/* {JSON.stringify(this.props.bookmarks)}
          {JSON.stringify(this.state)} */}
          {/* <Typography variant="caption" gutterBottom>
            Bookmark Button
          </Typography> */}
        </>
    );
  }
}

ToggleButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  bookmarks: state.bookmarks,
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(ToggleButtons)));
