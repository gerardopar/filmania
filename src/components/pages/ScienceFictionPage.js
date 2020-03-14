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

class ScienceFictionPage extends Component {
    constructor(props) {
        super(props);

        this.state = { // initial state
            movieName: '',
            movies: [],
            showSignupModal: false,
            Errors: {
                signup: null
            },
            maxPage: 0,
            nextPage: 1
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
        this.setState({ movieName: movieSearched });
    }

    handleMovies = () => {
        const page = 1;

        fetch(`https://filmania-rest-api.herokuapp.com/movies/scienceFiction?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            this.setState(({ 
                movies: [...data.movies],
                nextPage: 2, 
                maxPage: data.totalPages 
            }));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handlePagination = () => {
        this.setState(prevState => ({
            nextPage: prevState.nextPage + 1
        }));

        fetch(`https://filmania-rest-api.herokuapp.com/movies/scienceFiction?page=${this.state.nextPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            this.setState(prevState => ({
                movies: [...prevState.movies, ...data.movies]
            }));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        const filteredMovies = this.state.movies.filter(movie => movie.title.toLowerCase().includes(this.state.movieName.toLowerCase()));
        
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
                              handlePagination={this.handlePagination}
                              nextPage={this.state.nextPage}
                              maxPage={this.state.maxPage}
                              filteredMovies={filteredMovies}
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

ScienceFictionPage.propTypes = {
    handleLoginModal: PropTypes.func,
    showLoginModal: PropTypes.bool
};

ScienceFictionPage.defaultProps = {
    handleLoginModal: () => {},
    showLoginModal: false
};

export default ScienceFictionPage;
