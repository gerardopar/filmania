// * importing modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
 Router, Route, Switch, Redirect,
} from 'react-router-dom';
// importing history module
import { createBrowserHistory } from 'history';
import RouteContext from '../context/route-context'; // react context
// * importing components
import Dashboard from '../components/pages/Dashboard';
import AdventurePage from '../components/pages/AdventurePage';
import AnimationPage from '../components/pages/AnimationPage';
import ComedyPage from '../components/pages/ComedyPage';
import DocumentaryPage from '../components/pages/DocumentaryPage';
import DramaPage from '../components/pages/DramaPage';
import FantasyPage from '../components/pages/FantasyPage';
import HorrorPage from '../components/pages/HorrorPage';
import ScienceFictionPage from '../components/pages/ScienceFictionPage';
import ThrillerPage from '../components/pages/ThrillerPage';
import Movie from '../components/pages/Movie';
import FavoritesPage from '../components/pages/FavoritesPage';
import PageNotFound from '../components/pages/404page';
// * importing utils
import { setToken, removeToken } from '../utils/auth';
// app history initialized
export const history = createBrowserHistory();

// AppRouter component
class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            token: null,
            showLoginModal: false,
            showSignupModal: false,
            showMobileNav: false,
            emailError: '',
            passwordError: ''
        };
    }

    componentWillMount() {
        // checking if auth token is set
        const token = localStorage.getItem('token');
        const expDate = localStorage.getItem('tokenExpires'); 
        const date = Date.now(); // current date
        const currentDate = moment(date).format('MMMM Do YYYY, h:mm:ss a'); // current date format

        if (token) {
            this.setState({ isAuth: true, token });
        }
        if (expDate < currentDate) {
            this.handleAutoLogout();
        }
    }

    validate = (email, password) => {
        let isError = false;
        const errors = {
            emailError: '',
            passwordError: '',
        };

        if (email.length === 0) {
            isError = true;
            errors.emailError = 'Email cannot be empty';
        }

        if (password.length === 0) {
            isError = true;
            errors.passwordError = 'Password cannot be empty';
        }

        this.setState(prevState => ({ ...prevState, ...errors }));
        return isError;
    };

    handleLoginModal = () => { 
      this.setState(prevState => ({
          showLoginModal: !prevState.showLoginModal,
          emailError: '',
          passwordError: ''
      }));
  }

    // method: authenticates user
    handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const submitErrors = this.validate(email, password); // validate user input
        if (!submitErrors) {
        fetch('https://filmania-rest-api.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
        })
        .then((res) => {
            if (res.status === 422) {
                throw new Error('Validation failed.');
            }
            if (res.status === 401) {
                throw new Error('Email or Password is Incorrect');
            }
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Could not authenticate you!'); // this error is thrown in the catch block
            }
            return res.json();
        })
        .then((user) => {
            this.setState(() => ({
                isAuth: true,
                token: user.token,
                showLoginModal: false
            }));
            setToken(user.userId, user.token);
            history.push('/');
        })
        .catch((err) => {
            console.log(err);
        });
    }
  }

    handleSignupModal = () => {
      this.setState(prevState => ({
          showSignupModal: !prevState.showSignupModal,
          emailError: '',
          passwordError: ''
      }));
    }

    // method: handles user signup
    handleSignup = (e) => {
      e.preventDefault();
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      const submitErrors = this.validate(email, password); // validate user input
      if (!submitErrors) {
      fetch('https://filmania-rest-api.herokuapp.com/signup', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email, 
          password,
          movies: []
      })
      })
      .then((res) => {
          if (res.status === 422) {
          throw new Error(
              'Validation failed. Email already in use!'
          );
          }
          if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Creating a user failed!');
          }
          return res.json();
      })
      .then((result) => {
          console.log(result.message);
          this.setState({ showSignupModal: false });
      })
      .catch((err) => {
          console.log(err);
      });
    }
  }

    // method: handles logout
    handleLogout = (e) => {
        console.log(this.props);
        e.preventDefault();
        this.setState(() => ({
            isAuth: false,
            token: null
        }));
        history.push('/');
        removeToken();
    }

    // method : handles Auto logout 
    handleAutoLogout = () => {
        this.setState(() => ({
            isAuth: false,
            token: null
        }));
        removeToken();
    }

    handleMobileNav = () => {
        this.setState(prevState => ({
            showMobileNav: !prevState.showMobileNav
        }));
    }
    

    handleNavCollapse = () => {
        this.setState({ showMobileNav: false });
    }

    render() {
        const routes = (
            <Switch>
                <Route
                  path="/"
                  exact
                  render={props => (
                    <Dashboard
                      showLoginModal={this.state.showLoginModal}
                      showSignupModal={this.state.showSignupModal}
                      {...props}
                    />
                )} 
                />
                <Route
                  path="/adventure"
                  exact
                  render={props => (
                    <AdventurePage
                      showLoginModal={this.state.showLoginModal}
                      showSignupModal={this.state.showSignupModal}
                      {...props}
                    />
                )} 
                />
                <Route
                  path="/animation"
                  exact
                  render={props => (
                    <AnimationPage
                      showLoginModal={this.state.showLoginModal}
                      showSignupModal={this.state.showSignupModal}
                      {...props}
                    />
                )} 
                />
                <Route
                  path="/comedy"
                  exact
                  render={props => (
                    <ComedyPage
                      showLoginModal={this.state.showLoginModal}
                      showSignupModal={this.state.showSignupModal}
                      {...props}
                    />
                )} 
                />
                <Route
                  path="/documentary"
                  exact
                  render={props => (
                    <DocumentaryPage 
                      showLoginModal={this.state.showLoginModal}
                      showSignupModal={this.state.showSignupModal}
                      {...props}
                    />
                )} 
                />
                <Route
                  path="/drama"
                  exact
                  render={props => (
                    <DramaPage
                      showLoginModal={this.state.showLoginModal}
                      showSignupModal={this.state.showSignupModal}
                      {...props}
                    />
                )} 
                />
                <Route
                  path="/fantasy"
                  exact
                  render={props => (
                    <FantasyPage
                      showLoginModal={this.state.showLoginModal}
                      showSignupModal={this.state.showSignupModal}
                      {...props}
                    />
                )} 
                />
                <Route
                  path="/horror"
                  exact
                  render={props => (
                    <HorrorPage
                      showLoginModal={this.state.showLoginModal}
                      showSignupModal={this.state.showSignupModal}
                      {...props}
                    />
                )} 
                />
                <Route
                  path="/scienceFiction"
                  exact
                  render={props => (
                    <ScienceFictionPage
                      showLoginModal={this.state.showLoginModal}
                      showSignupModal={this.state.showSignupModal}
                      {...props}
                    />
                )} 
                />
                <Route
                  path="/thriller"
                  exact
                  render={props => (
                    <ThrillerPage
                      showLoginModal={this.state.showLoginModal}
                      showSignupModal={this.state.showSignupModal}
                      {...props}
                    />
                )} 
                />
                <Route
                  path="/movie/:id"
                  exact
                  render={props => (
                    <Movie
                      showLoginModal={this.state.showLoginModal}
                      showSignupModal={this.state.showSignupModal}
                      token={this.state.token}
                      {...props}
                    />
                )} 
                />
                <Route
                  path="/favorites"
                  exact
                  render={props => (
                    <FavoritesPage
                      showLoginModal={this.state.showLoginModal}
                      token={this.state.token}
                      {...props}
                    />
                )} 
                />
                <Route
                  render={props => (
                    <PageNotFound
                      {...props}
                    />
                )} 
                />
                <Redirect to="/" />
            </Switch>
            
        );
        return (
            <Router history={history}>
            <div>
            <RouteContext.Provider
              value={{ 
                        handleLogin: this.handleLogin,
                        handleLoginModal: this.handleLoginModal,
                        handleSignup: this.handleSignup,
                        handleSignupModal: this.handleSignupModal,
                        handleLogout: this.handleLogout,
                        emailError: this.state.emailError,
                        passwordError: this.state.passwordError,
                        isAuth: this.state.isAuth,
                        showMobileNav: this.state.showMobileNav,
                        handleMobileNav: this.handleMobileNav,
                        handleNavCollapse: this.handleNavCollapse
                    }}
            >
                {routes}
            </RouteContext.Provider>
            </div>
            </Router>
        );
    }
}
AppRouter.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  token: PropTypes.string
};

AppRouter.defaultProps = {
  history: {},
  token: ''
};

export default AppRouter;
