// * importing modules
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
// * importing components
import Header from '../header/Header';
import LoginModal from '../modals/LoginModal';
import SignupModal from '../modals/SignupModal';
import Spinner from '../spinner/Spinner';
import Navigation from '../nav/Navigation';
import MobileNavigation from '../nav/MovileNavigation';
import MovieList from '../MovieList';
import RouteContext from '../../context/route-context';

class ThrillerPage extends Component {
    constructor(props) {
        super(props);

        this.state = { // initial state
            movies: [],
            filteredMovies: [],
            showSignupModal: false,
            Errors: {
                signup: null
            }
        };
    }

    componentDidMount() {
        this.handleMovies();
    }

    handleSignupModal = () => {
        this.setState(prevState => ({
            showSignupModal: !prevState.showSignupModal
        }));
    }

    // method: handles user signup
    handleSignup = (e) => {
        e.preventDefault();
        fetch('https://filmania-rest-api.herokuapp.com/signup', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
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
            console.log(result);
            this.setState({ showSignupModal: false });
        })
        .catch((err) => {
            console.log(err);
            this.setState({ Errors: { signup: err.message } });
        });
    }

    handleMovieSearch = (e) => {
        e.preventDefault();
        const movieSearched = e.target.value.trim().toUpperCase(); // onchange user input

        const filteredMovies = this.state.movies.filter(movie => movie.title.toLowerCase().includes(movieSearched.toLowerCase())); 

        this.setState(() => ({
            filteredMovies // set the filtered movies array
        }));
    }

    handleMovieSearchSubmit = (e) => {
        e.preventDefault();
        const movieTitle = e.target.elements.title.value;
        if (movieTitle === '' || movieTitle.length === 0 || movieTitle === null || movieTitle === undefined) {
            console.log('no movie searched');
        } else {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=35d4df93498d535a82e07c079691b79c&language=en-US&query=${movieTitle}&page=1&include_adult=false`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then((movie) => {
            const movieId = movie.results[0].id;
            this.props.history.push(`/movie/${movieId}`);
        })
        .catch(err => (err));
        }
    }

    handleMovies = (pageNumber) => {
        const page = pageNumber;

        fetch(`https://filmania-rest-api.herokuapp.com/movies/thriller?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            this.setState(({ movies: [...data.movies] }));
        })
        .catch((err) => {
            console.log(err);
        });
}

    render() {
        return (
            <div>
            <ReactCSSTransitionGroup
              transitionName="trans"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
                {
                this.props.showLoginModal 
                    ? (
                    <LoginModal
                      handleLoginModal={this.props.handleLoginModal} 
                    />
                    ) 
                    : null
                }
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup
              transitionName="trans"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
                {
                this.state.showSignupModal 
                    ? (
                    <SignupModal 
                      signupError={this.state.Errors.signup}
                      handleSignup={this.handleSignup}
                      handleSignupModal={this.handleSignupModal} 
                    />
                    ) 
                    : null
                }
            </ReactCSSTransitionGroup>
                <Header 
                  handleSignupModal={this.handleSignupModal} 
                  handleMovieSearchSubmit={this.handleMovieSearchSubmit}
                  handleMovieSearch={this.handleMovieSearch}
                />
                <div className="layout">
                    <div className="layout__col--one z-depth-5">
                        <Navigation />
                    </div>
                    <div className="layout__col--two z-depth-5">
                    
                    <RouteContext.Consumer>
                    {routeContext => (
                    <React.Fragment>
                    <button 
                      className="material-icons waves-effect waves-light mobile__nav--btn--open" 
                      onClick={routeContext.handleMobileNav}
                      type="button"
                    >
                    menu
                    </button>
                        <ReactCSSTransitionGroup
                          transitionName="trans"
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={500}
                        >
                            {
                            routeContext.showMobileNav 
                                ? (
                                <MobileNavigation 
                                  handleSignupModal={this.handleSignupModal}
                                  handleMobileNav={routeContext.handleMobileNav} 
                                />
                                ) 
                                : null
                            }
                        </ReactCSSTransitionGroup>
                    </React.Fragment>
                                        )
                    }
                    </RouteContext.Consumer>
                        {
                        this.state.movies.length === 0 
                            ? <Spinner />
                            : (
                            <MovieList 
                              filteredMovies={this.state.filteredMovies}
                              movies={this.state.movies}
                              handleMovies={this.handleMovies}
                            />
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

ThrillerPage.propTypes = {
    history: PropTypes.objectOf(PropTypes.any),
    handleLoginModal: PropTypes.func,
    showLoginModal: PropTypes.func
};

ThrillerPage.defaultProps = {
    history: {},
    handleLoginModal: () => {},
    showLoginModal: () => {}
};

export default ThrillerPage;
