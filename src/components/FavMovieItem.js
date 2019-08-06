// importing modules
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const favMovieItem = props => (
    <div className="movieItem__wrap">
        <Link to={`/movie/${props.movie_tmdb_id}`}>
            <img className="movieItem__poster z-depth-5" src={`${props.movie_poster}`} alt="movie poster" />
            <div className="movieDetails__rating--wrap z-depth-5">
                <i className="material-icons movieDetails__icon">star</i>
                <p className="movieDetails__text">{props.movie_rating}</p>
            </div>
            <br />
            <button
              onClick={e => props.handleDeleteMovie(e, props._id)}
              className="btn-small waves-effect waves-light red"
              type="button"
            >
            REMOVE
            </button>
        </Link>
    </div>
);

favMovieItem.propTypes = {
    _id: PropTypes.string,
    movie_poster: PropTypes.string,
    movie_rating: PropTypes.string,
    movie_tmdb_id: PropTypes.string,
    handleDeleteMovie: PropTypes.func
};

favMovieItem.defaultProps = {
    _id: '',
    movie_poster: '',
    movie_rating: '',
    movie_tmdb_id: '',
    handleDeleteMovie: () => {}
};

export default favMovieItem;
