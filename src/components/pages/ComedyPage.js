// * importing modules
import React, { useState, useEffect, useContext } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
// * importing components
import Header from '../header/Header';
import LoginModal from '../modals/LoginModal';
import SignupModal from '../modals/SignupModal';
import Spinner from '../spinner/Spinner';
import Navigation from '../nav/Navigation';
import MobileNavigation from '../nav/MovileNavigation';
import MovieList from '../MovieList';
import RouteContext from '../../context/route-context';

const ComedyPage = ({
 showLoginModal, handleLoginModal, showSignupModal, handleSignupModal 
}) => {
    const { handleMobileNav, showMobileNav } = useContext(RouteContext);
    const [movies, setMovies] = useState([]);
    const [movieName, setMovieName] = useState('');
    const [maxPage, setMaxPage] = useState(0);
    const [nextPage, setNextPage] = useState(1);
    
    const handleMovieSearch = (e) => {
        e.preventDefault();
        const movieSearched = e.target.value.trim().toUpperCase(); // onchange user input
        setMovieName(movieSearched);
    };

    const handleMovies = () => {
        const page = 1;

        fetch(`https://filmania-rest-api.herokuapp.com/movies/comedy?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            setMovies([...data.movies]);
            setNextPage(2);
            setMaxPage(data.totalPages);
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        handleMovies();
    }, []);

    const handlePagination = () => {
        setNextPage(prevPage => prevPage + 1);

        fetch(`https://filmania-rest-api.herokuapp.com/movies/comedy?page=${nextPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => setMovies(prevMovies => [...prevMovies, ...data.movies]))
        .catch(err => console.log(err));
    };

    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(movieName.toLowerCase()));
        
    return (
        <div>
            <ReactCSSTransitionGroup
              transitionName="trans"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
                { showLoginModal ? <LoginModal handleLoginModal={handleLoginModal} /> : null }
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup
              transitionName="trans"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
                { showSignupModal ? <SignupModal handleSignupModal={handleSignupModal} /> : null }
            </ReactCSSTransitionGroup>
            <Header handleMovieSearch={handleMovieSearch} />
            <div className="layout">
                <div className="layout__col--one z-depth-5">
                    <Navigation />
                </div>
                <div className="layout__col--two z-depth-5">
                <button 
                  className="material-icons waves-effect waves-light mobile__nav--btn--open" 
                  onClick={handleMobileNav}
                  type="button"
                >
                menu
                </button>
                    <ReactCSSTransitionGroup
                      transitionName="trans"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                    >
                        {
                        showMobileNav 
                            ? (
                            <MobileNavigation 
                              handleSignupModal={handleSignupModal}
                              handleMobileNav={handleMobileNav} 
                            />
                            ) 
                            : null
                        }
                    </ReactCSSTransitionGroup>
                    {
                    movies.length === 0 
                        ? <Spinner />
                        : (
                        <MovieList 
                          handlePagination={handlePagination}
                          nextPage={nextPage}
                          maxPage={maxPage}
                          filteredMovies={filteredMovies}
                          movies={movies}
                          handleMovies={handleMovies}
                        />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

ComedyPage.propTypes = {
    handleLoginModal: PropTypes.func,
    handleSignupModal: PropTypes.func,
    showLoginModal: PropTypes.bool,
    showSignupModal: PropTypes.bool
};

ComedyPage.defaultProps = {
    handleLoginModal: () => {},
    handleSignupModal: () => {},
    showLoginModal: false,
    showSignupModal: false
};

export default ComedyPage;
