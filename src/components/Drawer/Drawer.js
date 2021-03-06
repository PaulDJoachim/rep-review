import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import logo from './logo.png'
import Modal from '../Modal/Modal'
import { connect } from 'react-redux';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      backgroundColor: 'red',
    },
    
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    // marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    
  },
  logo: {
    height: 200,
    width: 150,
    marginLeft: 35,
    cursor: 'pointer'
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleLink = (event) => {
    console.log(event.target.textContent)
    this.props.history.push('/'+event.target.textContent)
  }

  handleHome = () => {
    this.props.history.push('/home')
  }

  render() {
    const { classes, theme, children } = this.props;

    const drawer = (
      <div>
        {/* <div className={classes.toolbar} /> */}
        <Divider />
        <List>
          {['News', 'Search', 'Bills', 'Votes', 'Committees', 'Bookmarks'].map((text, index) => (
            <ListItem key={text} >
                <Button variant="contained" onClick={this.handleLink}>{text}</Button>
                
            </ListItem>
            
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Grid container style={{alignItems:'center'}} justify="space-between">
            <Hidden xsDown><p></p></Hidden>
              <Typography style={{cursor:'pointer'}} onClick={this.handleHome} variant="h3" noWrap>
                Rep-Review
              </Typography>
              {/* If the user is logged in, show a greeting and the log out button
                Otherwise show the log in button. */}
              {this.props.user.id ? 
              <Hidden xsDown>
                <Grid item spacing={0}>
                <Typography variant="h6">Hello {this.props.user.username}!</Typography>
                <Button variant="contained" style={{width:80}} onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>Log Out</Button>
                </ Grid>
              </Hidden>
                :<Modal />}
            </Grid>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <img className={classes.logo}  src={logo} alt="logo" onClick={this.handleHome}/>
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* "children" will take all child elements from the "Drawer" in app.js and render them here. */}
              {children}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});


export default connect(mapStateToProps)(withRouter(withStyles(styles, { withTheme: true })(ResponsiveDrawer)));