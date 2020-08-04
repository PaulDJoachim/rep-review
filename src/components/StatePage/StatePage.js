import React, { Component } from 'react';
import {connect} from 'react-redux';
import { sortBy } from 'lodash';

class StatePage extends Component {

// const StatePage = (match) => {
//   return(
//   <h1>HELLO {match.match.params.stateName}</h1>

  render() {
    const thisState = this.props.house.filter(person => person.state === this.props.match.params.stateName);
    const newArr = sortBy(thisState, 'district', function(n) {
      return Math.sin(n);
    });
    return(
      <>
        <h2>House Members</h2>
        <ul>
          {newArr.map((filteredPerson, index) => (
            <li key={index}>
              {filteredPerson.first_name} {filteredPerson.last_name} - {filteredPerson.party} <p>District: {filteredPerson.district}</p>
            </li>
          ))}
        </ul>
        <p>{JSON.stringify(this.props.match.params.stateName)}</p>
      </>
    )
  } 

}


const mapStateToProps = state => ({
  errors: state.errors,
  house: state.house,
});


export default connect(mapStateToProps)(StatePage);