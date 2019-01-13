import React from 'react';

import MovieItem from './MovieItem';
import Pagination from './Pagination';

const MovieList = (props) => (
    <div className="movieList__wrap z-depth-5">
        {
            props.filteredMovies.length > 0 ? props.filteredMovies.map((moviesList, index) => (
                <MovieItem 
                    {...moviesList}
                    key={index}
                    />
            )) : props.movies.length > 0 ? props.movies.map((moviesList, index) => (
                <MovieItem 
                    {...moviesList}
                    key={index}
                    />
            )) : null
        }
        <Pagination 
            handleMovies={props.handleMovies}/>
    </div>
);

export default MovieList;