import React, { Component } from 'react';
import {connect} from 'react-redux';
import { sortBy } from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const listStyle = {
  height: '100px',
  width: '82px',
  borderRadius: '10px',
}

const paperHolder = {
  marginTop: '40px',
  padding: 15,
  textAlign: 'center',
  backgroundColor: '#ead7aa',
  border: '1px solid #60563a'
}

class StatementList extends Component {

  render() {
    
    if (this.props.statements === undefined) return null;
    return(
      <>
        <Paper style={paperHolder}>
          <Typography variant='h4'>Today's Statements</Typography>
          {/* {JSON.stringify(this.props.statements)} */}
          <List>
            {this.props.statements.map((statement, index) => (
              <a style={{ textDecoration: 'none' }} href={statement.url}>
                <ListItem button key={index}>
                  <ListItemText>
                    {statement.title}
                  </ListItemText>
                </ListItem>
              </a>
            ))}
          </List>
        </Paper>
      </>
    )
  } 

}


const mapStateToProps = state => ({
  errors: state.errors,
  statements: state.statements.recentStatements
});


export default connect(mapStateToProps)(StatementList);