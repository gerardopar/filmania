/* eslint-disable */ 
// * importing modules
import React, { useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// * importing components
import Header from '../header/Header';
import LoginModal from '../modals/LoginModal';
import SignupModal from '../modals/SignupModal';
import Navigation from '../nav/Navigation';
import MovieDetails from '../MovieDetails';
import ConfirmationBar from '../confirmationBar/ConfirmationBar';
import Spinner from '../spinner/Spinner';

const Movie = (props) =>  {
    const [movieData, setMovieData] = useState({});
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [cast, setCast] = useState([]);
    const [favMovies, setfavMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHidden, setIsHidden] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showCopyConfirmation, setShowCopyConfirmation] = useState(false);
    const [showConfirmationError, setShowConfirmationError] = useState(false);

    useEffect(() => {
        handleGetMovieDetails();
        props.token ? handleFavMovies() : null;
    }, []);

    const handleFavMovies = () => {
        fetch('https://filmania-rest-api.herokuapp.com/movies/favorites', {
            headers: {
                Authorization: `Bearer ${props.token}`, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            // console.log('favorites', data);
            setfavMovies([...data.movies]);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleGetMovieDetails = () => {
        // get params id
        const movieId = props.match.params.id;

        // # fetching the movie details
        fetch(`https://filmania-rest-api.herokuapp.com/movies/movie/details/${movieId}`, {
        // fetch(`http://localhost:3030/movies/movie/details/${movieId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then((movieData) => {
            console.log('movie details', movieData);
            handleSimiliarMovies(movieId);
            handleMovieCast(movieId);
            setMovieData({...movieData.data});
            setIsLoading(!isLoading);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleSimiliarMovies = (movieId) => {
        // # fetching the movie details
        fetch(`https://filmania-rest-api.herokuapp.com/movies/similar/${movieId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then((movies) => {
            // console.log('related movies', movies);
            setRelatedMovies([...movies.movies]);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleMovieCast = (movieId) => {
        // # fetching the movie details
        fetch(`https://filmania-rest-api.herokuapp.com/movies/movie/cast/${movieId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then((cast) => {
            // console.log('member cast', cast);
            setCast([...cast.castMembers]);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleAddMovieToFav = (e, id, poster, title, rating) => {
        e.preventDefault();

        const movieToAdd = {
            movie_id: id,
            movie_poster: poster,
            movie_title: title,
            movie_rating: rating
        };

        const movieExists = favMovies.find(movie => movie.movie_title === title);

        if (movieExists) {
            if (props.token) {
                setShowConfirmationError(true);
                setTimeout(() => {
                    setShowConfirmationError(false)
                }, 2500);
            }
        } else {
            fetch('https://filmania-rest-api.herokuapp.com/movies/movie', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${props.token}`, // required to authenticate the user
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieToAdd
            })
            })
            .then(data => data.json())
            .then((movie) => {
                // console.log(movie);
                handleFavMovies();
                if (props.token) {
                    setShowConfirmation(true);
                    setTimeout(() => {
                        setShowConfirmation(false);
                    }, 2500);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    const handleCopyConfirmation = () => {
        setShowCopyConfirmation(true);
        setTimeout(() => {
            setShowCopyConfirmation(false);
        }, 2500);
    };

        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName="trans"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {
                    props.showLoginModal 
                        ? (
                    <LoginModal
                        handleLoginModal={props.handleLoginModal} 
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
                    props.showSignupModal 
                        ? (
                    <SignupModal 
                        handleSignupModal={props.handleSignupModal} 
                    />
                    ) 
                        : null
                    }
                </ReactCSSTransitionGroup>
                <Header 
                    isAuth={props.isAuth}
                    hidden={isHidden}
                    handleLogout={props.handleLogout}
                    handleLoginModal={props.handleLoginModal} 
                    handleSignupModal={props.handleSignupModal}
                />
                <div className="layout">
                    <div className="layout__col--one z-depth-5">
                        <Navigation />
                    </div>
                    <div className="layout__col--two z-depth-5">
                        {
                        isLoading 
                            ? <Spinner /> 
                            : (
                        <MovieDetails 
                            favMovies={favMovies}
                            handleAddMovieToFav={handleAddMovieToFav}
                            handleCopyConfirmation={handleCopyConfirmation}
                            movieData={movieData}
                            relatedMovies={relatedMovies}
                            castMembers={cast}
                            hidden={isHidden}
                        />
                        )
                        }
                    </div>
                </div>
                {
                    showConfirmation 
                        ? (
                            <ConfirmationBar customClass="confirmation" text="Movie successfully added to watchList!" />     
                        )
                        : (
                            <ConfirmationBar customClass="confirmation__none" text="Movie successfully added to watchList!" />    
                        )
                }
                {
                    showConfirmationError
                        ? (
                            <ConfirmationBar customClass="confirmationError" text="Movie already exists in watchlist!" />        
                        )
                        : (
                            <ConfirmationBar customClass="confirmationError__none" text="Movie already exists in watchlist!" />     
                        )
                }
                {
                    showCopyConfirmation
                        ? (
                            <ConfirmationBar customClass="confirmation" text="Link Copied!" />        
                        )
                        : (
                            <ConfirmationBar customClass="confirmation__none" text="Link Copied!" />     
                        )
                }
            </div>
        );
}

export default Movie;
