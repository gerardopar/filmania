// importing modules
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const movieItem = props => (
    <div className="movieItem__wrap">
        {
            props.hidden ? (
            <React.Fragment>
                <div className="movieDetails__rating--wrap z-depth-5">
                    <i className="material-icons movieDetails__icon">star</i>
                    <p className="movieDetails__text">{props.vote_average}</p>
                </div>
                <img className="movieItem__poster z-depth-5" src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`} alt="movie poster" />
            </React.Fragment>
            )
                        : (
            <Link to={`/movie/${props.id}`}>
                <div className="movieDetails__rating--wrap z-depth-5">
                    <i className="material-icons movieDetails__icon">star</i>
                    <p className="movieDetails__text">{props.vote_average}</p>
                </div>
                <img className="movieItem__poster z-depth-5" src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`} alt="movie poster" />
            </Link>
            )
        }
    </div>
);

movieItem.propTypes = {
    hidden: PropTypes.bool,
    id: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number
};

movieItem.defaultProps = {
    hidden: false,
    id: '',
    poster_path: '',
    vote_average: 0
};

export default movieItem;
