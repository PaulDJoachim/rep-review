import React, { Component } from 'react';
import {connect} from 'react-redux';
import { sortBy } from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



const listStyle = {
  height: '100px',
  width: '82px',
  borderRadius: '10px',
}



class StatementList extends Component {

  // componentDidMount() {
  //   this.props.dispatch({type:'GET_RECENT_VOTES'});
  // }

  handleStatementClick = (chamber, session, rollCall) => {
    this.props.history.push('/Statements/' + 'todo')
  }

  render() {
    
    if (this.props.statements === undefined) return null;
    return(
      <>
        <h2>Recent Statements</h2>
        {/* {JSON.stringify(this.props.statements)} */}
        <List>
          {this.props.statements.map((statement, index) => (
            <ListItem button key={index} onClick={()=>this.handleStatementClick()}>
              <ListItemText>
                {statement.title}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </>
    )
  } 

}


const mapStateToProps = state => ({
  errors: state.errors,
  statements: state.statements.recentStatements
});


export default connect(mapStateToProps)(StatementList);