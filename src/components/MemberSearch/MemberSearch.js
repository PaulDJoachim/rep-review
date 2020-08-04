import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Route, withRouter} from 'react-router-dom';




class MemberSearch extends Component {
  
  handleSelectState = (event) =>{
    // console.log(event.target.innerText)
    this.props.history.push('/Members/'+ event.target.innerText)
  }

  render() {
    let states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
    return (
      <div>
        <h2>This is the Member Search Page!</h2>
        <ul>
        {states.map((state, id)=>(
          <li key={id} onClick={this.handleSelectState}>{state}
          </li>
        ))}
        </ul>
        
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

export default withRouter(connect(mapStateToProps)(MemberSearch));

