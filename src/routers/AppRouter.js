// * importing modules
import React, { Component } from 'react';
import moment from 'moment';
import {
 BrowserRouter, Route, Switch, Redirect 
} from 'react-router-dom';
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

// AppRouter component
class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            token: null,
            showLoginModal: false,
            showMobileNav: false,
            Errors: {
                login: ''
            }
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleAutoLogout = this.handleAutoLogout.bind(this);
        this.handleLoginModal = this.handleLoginModal.bind(this);
        this.handleMobileNav = this.handleMobileNav.bind(this);
        this.handleNavCollapse = this.handleNavCollapse.bind(this);
    }

    componentDidMount() {
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

    handleLoginModal() { 
        this.setState(prevState => ({
            showLoginModal: !prevState.showLoginModal
        }));
    }

    // method: authenticates user
    handleLogin(e) {
        e.preventDefault();
        fetch('https://filmania-rest-api.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
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
        .then((resData) => {
            this.setState(() => ({
                isAuth: true,
                token: resData.token,
                showLoginModal: false
            }));
            const date = Date.now(); // new token date
            const dateAdded = moment(date).format('MMMM Do YYYY, h:mm:ss a'); // token creation date
            const dateAhead = moment(date).add(1, 'h'); // token life
            const dateToBeRemoved = moment(dateAhead._d).format('MMMM Do YYYY, h:mm:ss a'); // token remove date
            localStorage.setItem('tokenCreated', dateAdded);
            localStorage.setItem('tokenExpires', dateToBeRemoved);
            localStorage.setItem('isAuth', true);
            localStorage.setItem('token', resData.token);
            localStorage.setItem('userId', resData.userId);
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                Errors: {
                    login: err.message
                } 
            });
        });
    }

    // method: handles logout
    handleLogout(e) {
        e.preventDefault();
        this.setState(() => ({
            isAuth: false,
            token: null
        }));
        localStorage.removeItem('tokenCreated');
        localStorage.removeItem('tokenExpires');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    // method : handles Auto logout 
    handleAutoLogout() {
        this.setState(() => ({
            isAuth: false,
            token: null
        }));
        localStorage.removeItem('tokenCreated');
        localStorage.removeItem('tokenExpires');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    handleMobileNav() {
        this.setState(prevState => ({
            showMobileNav: !prevState.showMobileNav
        }));
    }

    handleNavCollapse() {
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
            <BrowserRouter>
            <div>
            <RouteContext.Provider
              value={{ 
                        loginError: this.state.Errors.login,
                        handleLogin: this.handleLogin,
                        handleLoginModal: this.handleLoginModal,
                        handleLogout: this.handleLogout,
                        isAuth: this.state.isAuth,
                        showMobileNav: this.state.showMobileNav,
                        handleMobileNav: this.handleMobileNav,
                        handleNavCollapse: this.handleNavCollapse
                    }}
            >
                {routes}
            </RouteContext.Provider>
            </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
