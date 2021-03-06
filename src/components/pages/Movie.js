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
import ConfirmationBar from '../confirmationBar/ConfirmationBar';
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
            isLoading: true,
            castMembers: [],
            favMovies: [],
            showConfirmation: false,
            showConfirmationError: false
        };
    }

    componentDidMount() {
        this.handleGetMovieDetails();
        this.props.token ? this.handleFavMovies() : null;
    }

    handleFavMovies = () => {
        fetch('https://filmania-rest-api.herokuapp.com/movies/favorites', {
            headers: {
                Authorization: `Bearer ${this.props.token}`, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log('favorites', data);
            this.setState(({ favMovies: [...data.movies] }));
        })
        .catch((err) => {
            console.log(err);
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
            console.log('movie details', movieData);
            this.handleMovieCast(movieId);
            this.handleSimiliarMovies(movieId);
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

    handleSimiliarMovies = (movieId) => {
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

    handleMovieCast = (movieId) => {
        // # fetching the movie details
        fetch(`https://filmania-rest-api.herokuapp.com/movies/movie/cast/${movieId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then((cast) => {
            this.setState({ castMembers: cast.castMembers });
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

        const { favMovies } = this.state;
        const movieExists = favMovies.find(movie => movie.movie_title === title);

        if (movieExists) {
            if (this.props.token) {
                this.setState({ showConfirmationError: true });
                setTimeout(() => {
                    this.setState({ showConfirmationError: false });
                }, 2500);
            }
        } else {
            fetch('https://filmania-rest-api.herokuapp.com/movies/movie', {
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
            .then((movie) => {
                console.log(movie);
                this.handleFavMovies();
                if (this.props.token) {
                    this.setState({ showConfirmation: true });
                    setTimeout(() => {
                        this.setState({ showConfirmation: false });
                    }, 2500);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
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
                  isAuth={this.props.isAuth}
                  hidden={this.state.hidden}
                  handleLogout={this.props.handleLogout}
                  handleLoginModal={this.props.handleLoginModal} 
                  handleSignupModal={this.props.handleSignupModal}
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
                          castMembers={this.state.castMembers}
                          hidden={this.state.hidden}
                          {...this.state} 
                        />
                        )
                        }
                    </div>
                </div>
                {
                    this.state.showConfirmation 
                        ? (
                            <ConfirmationBar customClass="confirmation" text="Movie successfully added to watchList!" />     
                        )
                        : (
                            <ConfirmationBar customClass="confirmation__none" text="Movie successfully added to watchList!" />    
                        )
                }
                {
                    this.state.showConfirmationError
                        ? (
                            <ConfirmationBar customClass="confirmationError" text="Movie already exists in watchlist!" />        
                        )
                        : (
                            <ConfirmationBar customClass="confirmationError__none" text="Movie already exists in watchlist!" />     
                        )
                }
            </div>
        );
    }
}

Movie.propTypes = {
    match: PropTypes.objectOf(PropTypes.any),
    isAuth: PropTypes.bool,
    token: PropTypes.string,
    handleLoginModal: PropTypes.func,
    handleSignupModal: PropTypes.func,
    handleLogout: PropTypes.func,
    showLoginModal: PropTypes.bool,
    showSignupModal: PropTypes.bool,
};

Movie.defaultProps = {
    match: {},
    isAuth: false,
    token: '',
    handleLoginModal: () => {},
    handleSignupModal: () => {},
    handleLogout: () => {},
    showLoginModal: false,
    showSignupModal: false
};

export default Movie;
