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

class DramaPage extends Component {
    constructor(props) {
        super(props);

        this.state = { // initial state
            movieName: '',
            movies: [],
            maxPage: 0,
            nextPage: 1
        };
    }

    componentDidMount() {
        this.handleMovies();
    }

    handleMovieSearch = (e) => {
        e.preventDefault();
        const movieSearched = e.target.value.trim().toUpperCase(); // onchange user input
        this.setState({ movieName: movieSearched });
    }

    handleMovies = () => {
        const page = 1;

        fetch(`https://filmania-rest-api.herokuapp.com/movies/drama?page=${page}`, {
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

        fetch(`https://filmania-rest-api.herokuapp.com/movies/drama?page=${this.state.nextPage}`, {
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
                this.props.showSignupModal 
                    ? (
                    <SignupModal 
                      handleSignupModal={this.props.handleSignupModal} 
                    />
                    ) 
                    : null
                }
            </ReactCSSTransitionGroup>
                <Header 
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
                                  handleSignupModal={this.props.handleSignupModal}
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

DramaPage.propTypes = {
    handleLoginModal: PropTypes.func,
    handleSignupModal: PropTypes.func,
    showLoginModal: PropTypes.bool,
    showSignupModal: PropTypes.bool
};

DramaPage.defaultProps = {
    handleLoginModal: () => {},
    handleSignupModal: () => {},
    showLoginModal: false,
    showSignupModal: false
};

export default DramaPage;
