import React, { Component } from 'react';
import {connect} from 'react-redux';
import { sortBy } from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  marginRight: '10px',
}

const paperHolder = {
  marginTop: '40px',
  padding: 15,
  textAlign: 'center',
  backgroundColor: '#ead7aa',
  border: '1px solid #60563a'
}

const paper = {
  padding: 10,
  textAlign: 'center',
  border: '1px solid #60563a'
}

class StatementList extends Component {

  state = {
    hasSearched: false,
    search: ''
  }

  // componnentDidMount() {
  //   this.setState
  // }

  handleSearchChange = (event) => {
    this.setState({search: event.target.value})
  }

  handleSearch = () => {
    this.setState({hasSearched: true})
    this.props.dispatch({type: 'SEARCH_STATEMENTS', payload: this.state.search})
  }

  handleMemberClick = (id) => {
    this.props.history.push('/Members/' + id)
  }

  render() {
    
    if (this.props.statements === undefined) return null;
    return(
      <>
        <Paper style={paperHolder}>
          <Typography variant='h4'>Search Statements</Typography>
          <Paper style={paper}>
          <FormControl>
            <TextField 
              variant='outlined'
              onChange={this.handleSearchChange}
              label="Enter Search Terms"
              value={this.state.search}
            />
            <Button onClick={this.handleSearch} style={{marginTop: 15}} variant="contained" color="primary">
              Search
            </Button>
            
          </FormControl>
          </Paper>
          {this.state.hasSearched && this.props.search.results ?
          <>
            <Typography variant='h4'>Statements Mentioning "{this.props.search.query}"</Typography>
            <List>
              {this.props.search.results.map((statement, index) => (
                <ListItem button key={index}>
                    <div onClick={()=>this.handleMemberClick(statement.member_id)} style={placeholder}>
                      <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${statement.member_id}.jpg`} />
                    </div>
                  <a style={{ textDecoration: 'none' }} href={statement.url}>
                  <ListItemText>
                    {statement.name} - {statement.party === 'D'?'Democratic':'Republican'} {statement.chamber === 'Senate'?'Senator':'House Member'}, {statement.state}  <br />
                    {statement.date} <br />
                    {statement.title}
                  </ListItemText>
              </a>
                </ListItem>
              ))}
            </List>
          </>
          :
          <div />
          }
        </Paper>
        <Paper style={paperHolder}>
          <Typography variant='h4'>Today's Statements</Typography>
          {/* {JSON.stringify(this.props.statements)} */}
          <List>
            {this.props.statements.map((statement, index) => (
              <ListItem button key={index}>
                  <div onClick={()=>this.handleMemberClick(statement.member_id)} style={placeholder}>
                    <img style={listStyle} src={`https://theunitedstates.io/images/congress/225x275/${statement.member_id}.jpg`} />
                  </div>
                <a style={{ textDecoration: 'none' }} href={statement.url}>
                  <ListItemText>
                    {statement.name} - {statement.party === 'D'?'Democratic':'Republican'} {statement.chamber === 'Senate'?'Senator':'House Member'}, {statement.state}  <br />
                    {statement.date} <br />
                    {statement.title}
                  </ListItemText>
              </a>
                </ListItem>
            ))}
          </List>
        </Paper>
      </>
    )
  } 

}


const mapStateToProps = state => ({
  errors: state.errors,
  statements: state.statements.recentStatements,
  search: state.statements.statementSearch
});


export default connect(mapStateToProps)(StatementList);