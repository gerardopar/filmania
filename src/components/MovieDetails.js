// importing modules
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// importing components
import MovieItem from './MovieItem';
import NoRelatedMovies from './NoRelatedMovies';
import CastItem from './CastItem';

const movieDetails = ({ castMembers, ...props }) => (
    <div className="movieDetails">
        <div 
          className="movieDetails__backdrop z-depth-5"
          style={{ backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0.20), rgba(66, 66, 66, 0.75)), url(${props.movie_backdrop})` }}
        >
            <img className="movieDetails__poster z-depth-5" src={props.movie_poster} alt="movie poster" />
            <h1 className="movieDetails__title">{props.movie_title}</h1>
            <p className="movieDetails__text">
            {props.movie_rdate} 
            {' '}
            {props.movie_genres}
            {' '}
            -
            {' '}
            {props.movie_length}
            min
            </p>
            <div className="movieDetails__btn--favorite--wrap">
                <button 
                  className="material-icons waves-effect waves-light movieDetails__btn--favorite" 
                  onClick={e => props.handleAddMovieToFav(e, props.movie_id, props.movie_poster, props.movie_title, props.movie_rating)}
                  type="button"
                >
                queue
                </button>
                <NavLink 
                  to="/"
                  className="material-icons waves-effect waves-light movieDetails__btn--favorite home" 
                >
                home
                </NavLink>
            </div>
        </div>
        
        <div className="movieDetails__content--wrap">
            <div className="movieDetails__col--one">
                <h3 className="movieDetails__text">Overview</h3>
                <p className="movieDetails__text">{props.movie_overview}</p>
            </div>

            <div className="movieDetails__col--two">
                <div className="movieDetails__trailer--wrap">
                    <iframe 
                      className="movieDetails__trailer z-depth-5" 
                      src={props.movie_trailer} 
                      frameBorder="0" 
                      allow="autoplay; encrypted-media" 
                      allowFullScreen
                      title={props.movie_title}
                    />
                </div>
            </div>
        </div>

        <div className="movieDetails__cast">
            <div className="movieDetails__cast--container">
                {
                    castMembers.map(member => (
                    <CastItem {...member} key={uuidv4()} />
                    ))
                }
            </div>
        </div>
        

        <div className="movieList__wrap z-depth-5">
            {
                props.related_movies.length > 0 ? props.related_movies.map(moviesList => (
                    <MovieItem 
                      {...moviesList}
                      key={uuidv4()}
                      hidden={props.hidden}
                    />
                )) : <NoRelatedMovies />
            }
        </div>
    </div>
    );

movieDetails.propTypes = {
    hidden: PropTypes.bool,
    movie_backdrop: PropTypes.string,
    movie_genres: PropTypes.arrayOf(PropTypes.string),
    movie_id: PropTypes.number,
    movie_length: PropTypes.number,
    movie_overview: PropTypes.string,
    movie_poster: PropTypes.string,
    movie_rating: PropTypes.number,
    movie_rdate: PropTypes.string,
    movie_title: PropTypes.string,
    movie_trailer: PropTypes.string,
    related_movies: PropTypes.arrayOf(PropTypes.object),
    handleAddMovieToFav: PropTypes.func,
    castMembers: PropTypes.arrayOf(PropTypes.object)
};

movieDetails.defaultProps = {
    hidden: true,
    movie_backdrop: '',
    movie_genres: [],
    movie_id: 0,
    movie_length: 0,
    movie_overview: '',
    movie_poster: '',
    movie_rating: 0,
    movie_rdate: '',
    movie_title: '',
    movie_trailer: '',
    related_movies: [],
    handleAddMovieToFav: () => {},
    castMembers: []
};

export default movieDetails;
