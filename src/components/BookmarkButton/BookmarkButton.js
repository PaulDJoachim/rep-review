import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
    bookmarked: false,
  };

  handleBookmark = (event, bookmarked) => {
    this.setState({ bookmarked })
    this.props.dispatch({type:'ADD_BOOKMARK', payload: this.props.location.pathname})
  };

  render() {
    const { classes } = this.props;
    const { bookmarked } = this.state;

    return (
        <>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup value={bookmarked} exclusive onChange={this.handleBookmark}>
              <ToggleButton value='true'>
                {this.state.bookmarked ? <StarIcon /> : <StarBorderIcon />}
                
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {JSON.stringify(this.props.location.pathname)}
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
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(ToggleButtons)));
