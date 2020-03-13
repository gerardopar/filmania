// * importing modules
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

// * importing components
import Header from '../header/Header';
import LoginModal from '../modals/LoginModal';
import SignupModal from '../modals/SignupModal';
import Navigation from '../nav/Navigation';
import MovieDetails from '../MovieDetails';
import Spinner from '../spinner/Spinner';

class Movie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie_backdrop: '',
            movie_genres: [],
            movie_overview: '',
            movie_id: '',
            movie_length: '',
            movie_poster: null,
            movie_rdate: '',
            movie_title: null,
            movie_trailer: '',
            movie_rating: '',
            related_movies: [],
            hidden: true,
            showSignupModal: false,
            isLoading: true,
            Errors: {
                signup: null
            }
        };
    }

    componentDidMount() {
        this.handleGetMovieDetails();
        this.handleSimiliarMovies();
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
        .then(() => {
            this.setState({ showSignupModal: false });
        })
        .catch((err) => {
            console.log(err);
            this.setState({ Errors: { signup: err.message } });
        });
    }

    handleGetMovieDetails = () => {
        // get params id
        const movieId = this.props.match.params.id;

        // # fetching the movie details
        fetch(`https://filmania-rest-api.herokuapp.com/movies/movie/details/${movieId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then((movieData) => {
            this.setState(({
                movie_backdrop: movieData.movie.backdrop,
                movie_id: movieData.movie.id,
                movie_length: movieData.movie.length,
                movie_overview: movieData.movie.overview,
                movie_poster: movieData.movie.poster,
                movie_rating: movieData.movie.rating,
                movie_rdate: movieData.movie.rdate,
                movie_title: movieData.movie.title,
                movie_trailer: movieData.movie.video,
                isLoading: false
            }));
            movieData.movie.genres.forEach((movie) => {
                this.setState(prevState => ({
                    movie_genres: prevState.movie_genres.concat(` - ${movie.name}`)
                }));
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleSimiliarMovies = () => {
        const movieId = this.props.match.params.id;

        // # fetching the movie details
        fetch(`https://filmania-rest-api.herokuapp.com/movies/similar/${movieId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then((movies) => {
            this.setState(() => ({
                related_movies: movies.movies
            }));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleAddMovieToFav = (e, id, poster, title, rating) => {
        e.preventDefault();

        const movieToAdd = {
            movie_id: id,
            movie_poster: poster,
            movie_title: title,
            movie_rating: rating
        };

        e.preventDefault();
        fetch('https://filmania-rest-api.herokuapp.com/movies/addToFav', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.props.token}`, // required to authenticate the user
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieToAdd
            })
        })
        .then(data => data.json())
        .then(() => {
            // console.log(data);
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
                  isAuth={this.props.isAuth}
                  hidden={this.state.hidden}
                  handleLogout={this.props.handleLogout}
                  handleLoginModal={this.props.handleLoginModal} 
                  handleSignupModal={this.handleSignupModal}
                />
                <div className="layout">
                    <div className="layout__col--one z-depth-5">
                        <Navigation />
                    </div>
                    <div className="layout__col--two z-depth-5">
                        {
                        this.state.isLoading 
                             ? <Spinner /> 
                             : (
                        <MovieDetails 
                          handleAddMovieToFav={this.handleAddMovieToFav}
                          handleRedirectHome={this.handleRedirectHome}
                          hidden={this.state.hidden}
                          {...this.state} 
                        />
                        )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Movie.propTypes = {
    match: PropTypes.objectOf(PropTypes.any),
    isAuth: PropTypes.bool,
    token: PropTypes.string,
    handleLoginModal: PropTypes.func,
    handleLogout: PropTypes.func,
    showLoginModal: PropTypes.func,
    showSignupModal: PropTypes.func,
};

Movie.defaultProps = {
    match: {},
    isAuth: false,
    token: '',
    handleLoginModal: () => {},
    handleLogout: () => {},
    showLoginModal: () => {},
    showSignupModal: () => {}
};

export default Movie;
