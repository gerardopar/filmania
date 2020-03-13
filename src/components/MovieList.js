// importing modules
import React from 'react';
import PropTypes from 'prop-types';
// importing components
import MovieItem from './MovieItem';
// import Pagination from './nav/Pagination';

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
        <div className="pagination__wrap">
            <button 
              disabled={props.nextPage >= props.maxPage}
              onClick={props.handlePagination} 
              className="pagination__button waves-effect waves-light" 
              type="button"
            >
            LOAD MORE
            </button>
        </div>
    </div>
);

movieList.propTypes = {
    filteredMovies: PropTypes.arrayOf(PropTypes.object),
    movies: PropTypes.arrayOf(PropTypes.object),
    handlePagination: PropTypes.func,
    nextPage: PropTypes.number,
    maxPage: PropTypes.number
};

movieList.defaultProps = {
    filteredMovies: [],
    movies: [],
    handlePagination: () => {},
    nextPage: 1,
    maxPage: 1
};

export default movieList;
