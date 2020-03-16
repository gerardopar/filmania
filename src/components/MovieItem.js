// importing modules
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
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
                <img 
                  className="movieItem__poster z-depth-5" 
                  src={props.poster_path !== null ? `https://image.tmdb.org/t/p/w500/${props.poster_path}` : 'https://s3-ap-southeast-1.amazonaws.com/silverscreen-photos/1534489151m000001.jpg'}
                  alt="movie poster"
                />
            </React.Fragment>
            )
                        : (
            <Link to={`/movie/${props.id}`}>
                <div className="movieDetails__rating--wrap z-depth-5">
                    <i className="material-icons movieDetails__icon">star</i>
                    <p className="movieDetails__text">{props.vote_average}</p>
                </div>
                <img
                  className="movieItem__poster z-depth-5"
                  src={props.poster_path !== null ? `https://image.tmdb.org/t/p/w500/${props.poster_path}` : 'https://s3-ap-southeast-1.amazonaws.com/silverscreen-photos/1534489151m000001.jpg'}
                  alt="movie poster"
                />
            </Link>
            )
        }
    </div>
);

movieItem.propTypes = {
    hidden: PropTypes.bool,
    id: PropTypes.number,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number
};

movieItem.defaultProps = {
    hidden: false,
    id: 0,
    poster_path: '',
    vote_average: 0
};

export default withRouter(movieItem);
