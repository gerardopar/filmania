/* eslint-disable */ 
// importing modules
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { v4 as uuidv4 } from 'uuid';
import YouTube from 'react-youtube';
import copy from "clipboard-copy";
// importing components
import MovieItem from './MovieItem';
import NoRelatedMovies from './NoRelatedMovies';
// importing utility functions
import getNchars from '../utils/str';
import timeConverter from '../utils/timeConverter';
import genreRedirectPath from '../utils/genreRedirect';

const movieDetails = ({ 
        movieData, 
        relatedMovies, 
        castMembers, 
        hidden, 
        handleAddMovieToFav, 
        favMovies,
        handleCopyConfirmation
}) => {
    const history = useHistory();
    const [showOverlay, setShowOverlay] = useState(false);
    const [ ytPlayer, setYtPlayer ] = useState({});
    const [ isPlaying, setIsPlaying ] = useState(true);
    const [ isMuted, setIsMuted  ] = useState(false);
    const imgUrl = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`;
    const movieIsFav = favMovies.findIndex((movie) => movie.movie_title === movieData.original_title);

    const opts = {
        playerVars: {
            autoplay: 1,
            rel: 0,
            showinfo: 0,
            controls: 0,
            autohide: 0,
            modestbranding: 0
        },
    };

    const handleVideoReady = (event) => {
        setYtPlayer(event.target);
    }

    const handlePlayVideo = () => {
        if(isPlaying === true) {
            setIsPlaying(false);
            ytPlayer.pauseVideo();
        } else if (isPlaying === false) {
            setIsPlaying(true);
            ytPlayer.playVideo();
        }
    };

    const handleMuteVideo = () => {
        if(isMuted === true) {
            setIsMuted(false);
            ytPlayer.unMute();
        } else if (isMuted === false) {
            setIsMuted(true);
            ytPlayer.mute();
        }
    };

    const handleResetVideo = () => {
        ytPlayer.seekTo(0);
    };

return (
    <div className="movieDetails">
        <div 
            onMouseOver={() => {
                setShowOverlay(true);
            }}

            onMouseLeave={() => {
                setShowOverlay(false);
            }}
            className="movieDetails__backdrop z-depth-5"
        >
            <div className="movieDetails__trailer--wrap">
                <YouTube
                    opts={opts}
                    containerClassName="movieDetails__trailer--wrap movieDetails__trailer--wrap2"
                    className="movieDetails__trailer z-depth-5" 
                    videoId={movieData.videoId}
                    onReady={(e) => handleVideoReady(e)}
                />
                <ReactCSSTransitionGroup
                    transitionName="trans"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                {
                    showOverlay 
                    && 
                    <div 
                        className="movieDetails__overlay"
                        style={{ background: `bottom linear-gradient(rgba(255, 255, 255, 0.0), rgba(66, 66, 66, 1))` }}
                        >
                        <img className="movieDetails__poster z-depth-5" src={imgUrl} alt="movie poster" />
                        <h1
                        className="movieDetails__posted--title"
                        >{movieData.title}
                        </h1>
                        <div className="movieDetails__btn--wrap">
                            <button 
                                className="movieDetails__btn--play waves-effect waves-light" 
                                onClick={handlePlayVideo}
                            >   
                                {
                                    isPlaying 
                                    ? 
                                    <i className="material-icons movieDetails__btn--icon ">pause</i>
                                    : 
                                    <i className="material-icons movieDetails__btn--icon ">play_arrow</i>
                                }
                            </button>
                            <button 
                                className="movieDetails__btn--play waves-effect waves-light" 
                                onClick={handleResetVideo}
                            >
                                <i className="material-icons movieDetails__btn--icon">autorenew</i>
                            </button>
                            <button 
                                className="movieDetails__btn--mute waves-effect waves-light" 
                                onClick={handleMuteVideo}
                            >
                                {
                                    isMuted ?
                                    <i className="material-icons movieDetails__btn--icon">volume_off</i>
                                    :
                                    <i className="material-icons movieDetails__btn--icon">volume_up</i>
                                }
                                
                            </button>
                        </div>
                    </div>
                }
                </ReactCSSTransitionGroup>
            </div>
        </div>
        {/* movie details */}
        <div className="movieDetails__about">
            <div className="movieDetails__about--col--one">
                <div className="movieDetails__about--header--wrap">
                    <div className="movieDetails__about--btns--wrap">
                        <button 
                        className="waves-effect waves-light movieDetails__about--btn--fav" 
                        onClick={e => handleAddMovieToFav(
                            e, 
                            movieData.id,
                            imgUrl, 
                            movieData.original_title, 
                            movieData.vote_average
                        )}
                        type="button"
                        >
                            {
                                movieIsFav !== -1 ?
                                <i className="material-icons movieDetails__btn--icon">favorite</i>
                                :
                                <i className="material-icons movieDetails__btn--icon">favorite_border</i>
                            }
                            
                        </button>
                        <button 
                        className="waves-effect waves-light movieDetails__about--btn--link" 
                        onClick={() => {
                            copy(`${window.origin}/movie/${movieData.id}`)
                            handleCopyConfirmation()
                        }}
                        type="button"
                        >
                            <i className="material-icons movieDetails__btn--icon">link</i>
                        </button>
                    </div>
                    {/* streamers */}
                    <div className="movieDetails__about--streamers--wrap">
                        {
                            (movieData['watch/providers'].results.US && movieData['watch/providers'].results.US.flatrate)
                            ?
                            movieData['watch/providers'].results.US.flatrate.slice(0, 4).map((streamer, index) => 
                                <img 
                                    key={index}
                                    className="movieDetails__about--streamers--img" 
                                    src={`https://image.tmdb.org/t/p/w500/${streamer.logo_path}`} 
                                    alt="streamer-logo" 
                                />
                            ) : null
                        }
                    </div>
                </div>
                <h2
                    className="movieDetails__about--col--one--title"
                >Overview
                </h2>
                <p
                    className="movieDetails__about--col--one--text"
                >
                {movieData.overview}
                </p>
                <div className="movieDetails__about--col--one--details--wrap">
                    <p
                        className="movieDetails__about--col--one--details--rating"
                    >
                        <i className="material-icons movieDetails__about--col--one--details--rating--icon">star</i>
                        {movieData.vote_average}
                    </p>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <p 
                        className="movieDetails__about--col--one--details--text"
                    >
                    Released: 
                        <span className="movieDetails__about--col--one--details--text--span"> {movieData.release_date}</span>
                    </p>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <p 
                        className="movieDetails__about--col--one--details--text"
                    >
                    Runtime: 
                        <span className="movieDetails__about--col--one--details--text--span"> {timeConverter(movieData.runtime)}</span>
                    </p>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    
                </div>
            </div>
            <div className="movieDetails__about--col--two">
                {/* genres */}
                <div className="movieDetails__about--col--two--title--wrap">
                    <h4 className="movieDetails__about--col--two--title">Genres</h4>
                </div>
                <div className="movieDetails__about--col--two--genres--wrap">
                    {
                        movieData.genres.map((genre) => (
                            <p 
                                onClick={() => {
                                    const pathToGenre = genreRedirectPath(genre.name);
                                    history.push(pathToGenre);
                                }}
                                className="movieDetails__about--col--two--genres--item" 
                                key={genre.id}
                            >
                            {genre.name
                            }</p>
                        ))
                    }
                </div>
                {/* cast */}
                <div className="movieDetails__about--col--two--title--wrap">
                    <h4 className="movieDetails__about--col--two--title">Cast</h4>
                </div>
                <div className="movieDetails__about--col--two--cast--wrap">
                    {
                        castMembers.length > 0 ? castMembers.slice(0, 6).map((member) => (
                            <div key={member.id} className="movieDetails__about--col--two--cast--item--wrap">
                                <img
                                    className="movieDetails__about--col--two--cast--item--img" 
                                    src={member.profile_path !== null 
                                        ? `https://image.tmdb.org/t/p/w500/${member.profile_path}` 
                                        : 'https://s3-ap-southeast-1.amazonaws.com/silverscreen-photos/1534489151m000001.jpg'
                                    } 
                                    alt="cast memeber" />
                                <p className="movieDetails__about--col--two--cast--item--name">{getNchars(member.name, 20)}</p>
                                <p className="movieDetails__about--col--two--cast--item--name">{getNchars(member.character, 20)}</p>
                            </div>
                        )) : <p>No Cast Members found</p>
                    }
                </div>
            </div>
        </div>
        {/* related items list */}
        <div className="moviesList__title--container">
            <h1 className="moviesList__title">Related Items</h1>
        </div>
        <div className="movieList__wrap--short--padding">
            {
                relatedMovies.length > 0 ? relatedMovies.map(moviesList => (
                    <MovieItem 
                        {...moviesList}
                        key={uuidv4()}
                        hidden={hidden}
                    />
                )) : <NoRelatedMovies />
            }
        </div>
    </div>
    );
};

export default movieDetails;
