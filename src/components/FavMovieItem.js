import React from 'react';
import { Link } from 'react-router-dom';

const FavMovieItem = (props) => (
    <div className="movieItem__wrap">
        
        <Link to={`/movie/${props.movie_tmdb_id}`}>
            <img className="movieItem__poster z-depth-5" src={`${props.movie_poster}`} />
            <div className="movieDetails__rating--wrap z-depth-5">
                <i className="material-icons movieDetails__icon">star</i>
                <p className="movieDetails__text">{props.movie_rating}</p>
            </div>
            <br />
            <button
                onClick={(e) => props.handleDeleteMovie(e, props._id)}
                className="btn-small waves-effect waves-light red">REMOVE</button>
        </Link>
        
    </div>
);

export default FavMovieItem;

// <img className="movieItem__poster z-depth-5" src={props.poster_path} />