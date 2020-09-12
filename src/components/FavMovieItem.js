/* eslint-disable camelcase */
// importing modules
import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const favMovieItem = ({
 movie_tmdb_id, movie_poster, movie_rating, _id, handleDeleteMovie 
}) => {
    const history = useHistory();
    return (
        <div className="movieItem__wrap">
            <img onClick={() => history.push(`/movie/${movie_tmdb_id}`)} className="movieItem__poster z-depth-5" src={`${movie_poster}`} alt="movie poster" />
            <div className="movieDetails__rating--wrap z-depth-5">
                <i className="material-icons movieDetails__icon">star</i>
                <p className="movieDetails__text">{movie_rating}</p>
            </div>
            <br />
            <button
              onClick={e => handleDeleteMovie(e, _id)}
              className="btn-small waves-effect waves-light red"
              type="button"
            >
            REMOVE
            </button>
        </div>
    );
}; 

favMovieItem.propTypes = {
    _id: PropTypes.string,
    movie_poster: PropTypes.string,
    movie_rating: PropTypes.number,
    movie_tmdb_id: PropTypes.string,
    handleDeleteMovie: PropTypes.func
};

favMovieItem.defaultProps = {
    _id: '',
    movie_poster: '',
    movie_rating: 0,
    movie_tmdb_id: '',
    handleDeleteMovie: () => {}
};

export default favMovieItem;
