// importing modules
import React from 'react';
import PropTypes from 'prop-types';
// importing components
import MovieItem from './MovieItem';
import Pagination from './nav/Pagination';

const movieList = props => (
    <div className="movieList__wrap z-depth-5">
        {
            props.filteredMovies.length > 0 ? props.filteredMovies.map(movie => (
                <MovieItem 
                  {...movie}
                  key={movie.id}
                />
            )) : props.movies.length > 0 ? props.movies.map(movie => (
                <MovieItem 
                  {...movie}
                  key={movie.id}
                />
            )) : null
        }
        <Pagination 
          handleMovies={props.handleMovies} 
        />
    </div>
);

movieList.propTypes = {
    filteredMovies: PropTypes.arrayOf(PropTypes.object),
    movies: PropTypes.arrayOf(PropTypes.object),
    handleMovies: PropTypes.func
};

movieList.defaultProps = {
    filteredMovies: [],
    movies: [],
    handleMovies: () => {}
};

export default movieList;
