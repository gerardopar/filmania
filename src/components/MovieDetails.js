// * importing modules
import React from 'react';

// * importing components
import MovieItem from './MovieItem';

const MovieDetails = (props) => {
        return (
        <div className="movieDetails">
            <div 
                className="movieDetails__backdrop z-depth-5"
                style={{backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0.20), rgba(66, 66, 66, 0.75)), url(${props.movie_backdrop})`}}>
                    <img className="movieDetails__poster z-depth-5" src={props.movie_poster} alt="poster"/>
                    <h1 className="movieDetails__title">{props.movie_title}</h1>
                    <p className="movieDetails__text">{props.movie_rdate} {props.movie_genres} - {props.movie_length}min</p>

                    <div className="movieDetails__btn--favorite--wrap">
                        <button 
                            className="material-icons waves-effect waves-light movieDetails__btn--favorite" 
                            onClick={(e) => props.handleAddMovieToFav(e, props.movie_id, props.movie_poster, props.movie_title, props.movie_rating)}>queue</button>
                        <button 
                            className="material-icons waves-effect waves-light movieDetails__btn--favorite home" 
                            onClick={props.handleRedirectHome}>home</button>
                    </div>
            </div>
            
            <div className="movieDetails__content--wrap">
                <div className="movieDetails__col--one">
                    <h3 className="movieDetails__text">Overview</h3>
                    <p className="movieDetails__text">{props.movie_overview}</p>
                </div>

                <div className="movieDetails__col--two">
                    <div className="movieDetails__trailer--wrap">
                        <iframe className="movieDetails__trailer z-depth-5" src={props.movie_trailer} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    </div>
                </div>
            </div>

            <div className="movieList__wrap z-depth-5">
                {
                    props.related_movies.length > 0 ? props.related_movies.map((moviesList, index) => (
                        <MovieItem 
                        {...moviesList}
                        key={index}
                        hidden={props.hidden}
                        /> )) : null
                }
            </div>
        </div>
        )
}

export default MovieDetails;
