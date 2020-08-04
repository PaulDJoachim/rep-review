import React, { Component } from 'react';
import {connect} from 'react-redux';

class WelcomePage extends Component {

  // filterByState = () => {
  //   let allHouseMembers = this.props.house.members;
  //   let stateHouseMembers = []
  //   for (i=0;i<allHouseMembers.length;i++) {
  //     if (allHouseMembers.state === 'TX') {
  //     }
  //   }
  // }

  render() {
    return (
      <div>
        <h2>Welcome To Rep-Review!</h2>
       <p>Here you can find information about all 535 members of congress as well as congressional committees, current bills, and voting records.</p>
       <p>Use the sidebar to browse categories, or log in to get information about your state.</p>
       {/* <p>{JSON.stringify(this.props.house)}</p> */}

      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  house: state.house,
});

export default connect(mapStateToProps)(WelcomePage);

