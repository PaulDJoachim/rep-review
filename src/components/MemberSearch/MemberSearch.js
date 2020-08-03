import React, { Component } from 'react';
import {connect} from 'react-redux';

class MemberSearch extends Component {


  render() {
    return (
      <div>
        <h2>This is the Member Search Page!</h2>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(MemberSearch);

