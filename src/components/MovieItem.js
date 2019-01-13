import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = (props) => (
    <div className="movieItem__wrap">
        {
            props.hidden ? <React.Fragment>
                            <div className="movieDetails__rating--wrap z-depth-5">
                                <i className="material-icons movieDetails__icon">star</i>
                                <p className="movieDetails__text">{props.vote_average}</p>
                            </div>
                            <img className="movieItem__poster z-depth-5" src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`} />
                            </React.Fragment>
                        :   <Link to={`/movie/${props.id}`}>
                                <div className="movieDetails__rating--wrap z-depth-5">
                                    <i className="material-icons movieDetails__icon">star</i>
                                    <p className="movieDetails__text">{props.vote_average}</p>
                                </div>
                            <img className="movieItem__poster z-depth-5" src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`} />
                            </Link>
        }
        
    </div>
);

export default MovieItem;