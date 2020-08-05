import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

// import Nav from '../Nav/Nav';
import Drawer from '../Drawer/Drawer';
import Footer from '../Footer/Footer';

// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

// import AboutPage from '../AboutPage/AboutPage';
// import UserPage from '../UserPage/UserPage';
// import InfoPage from '../InfoPage/InfoPage';
import WelcomePage from '../WelcomePage/WelcomePage';
import MemberSearch from '../MemberSearch/MemberSearch';
import StatePage from '../StatePage/StatePage';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

import './App.css';

// const StateRepList = ({match}) => console.log('match',match) ||(

//     <div>
//       <h1>This state is {match.params.stateName}</h1>
//       {/* {this.props.dispatch({type:'GET_STATE_REPS' })} */}
//     </div>

// )

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
    this.props.dispatch({type: 'GET_HOUSE'})
    this.props.dispatch({type: 'GET_SENATE'})
  }



  render() {
    return (
      <Router>
        <ScrollToTop>
          <div>
            {/* <Nav /> */}
            {/* Drawer replaces the default Nav. All children of the Drawer element
            will be added to the "Main" div within the Drawer component. */}
            <Drawer>
              <Switch>
                {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                <Redirect exact from="/" to="/home" />
                {/* Visiting localhost:3000/about will show the about page.
                This is a route anyone can see, no login necessary */}

                {/* <Route
                  exact
                  path="/about"
                  component={AboutPage}
                /> */}

                {/* For protected routes, the view could show one of several things on the same route.
                Visiting localhost:3000/home will show the UserPage if the user is logged in.
                If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
                Even though it seems like they are different pages, the user is always on localhost:3000/home */}
                
                <WelcomePage
                  exact
                  path="/home"
                  component={WelcomePage}
                />

                <MemberSearch
                  exact
                  path="/Members"
                  component={MemberSearch}
                />
                <Route path={`/Members/:stateName`} component={StatePage} />
                {/* This works the same as the other protected route, except that if the user is logged in,
                they will see the info page instead. */}

                {/* <ProtectedRoute
                  exact
                  path="/info"
                  component={InfoPage}
                /> */}

                {/* If none of the other routes matched, we will show a 404. */}
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </Drawer>
            <Footer />
          </div>
        </ScrollToTop>
      </Router>
  )}
}

export default connect()(App);
