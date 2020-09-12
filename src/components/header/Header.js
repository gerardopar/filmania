// importing modules
import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// importing react context
import RouteContext from '../../context/route-context';

const Header = ({ handleMovieSearch, hidden }) => {
  const history = useHistory();
  const {
 isAuth, handleLoginModal, handleLogout, handleSignupModal
} = useContext(RouteContext);

  const handleMovieSearchSubmit = (e) => {
    e.preventDefault();
    const movieTitle = e.target.elements.title.value;
    if (movieTitle === '' || movieTitle.length === 0 || movieTitle === null || movieTitle === undefined) {
        console.log('no movie searched');
    } else {
        fetch(`https://filmania-rest-api.herokuapp.com/movies/movie/search/${movieTitle}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => data.json())
    .then((movie) => {
        history.push(`/movie/${movie.movieId}`);
    })
    .catch(err => (err));
    }
  };

    return (
      <div>
          <header className="header z-depth-5">
            <div><NavLink to="/" className="header__title">FILMANIA</NavLink></div>
              {
              hidden 
                  ? <div />
                  : (
                  <form onSubmit={handleMovieSearchSubmit} className="header__form z-depth-5">
                      <input 
                        onChange={handleMovieSearch} 
                        className="header__form--input" 
                        placeholder="SEARCH MOVIES.." 
                        name="title"
                        autoComplete="off"
                      />
                      <button 
                        type="submit" 
                        className="material-icons waves-effect waves-light header__form--btn white-text"
                      >
                      search
                      </button>
                  </form>
                  )
              }
              <div>
                  {
                  isAuth === false
                      ? (
                      <div>
                          <button 
                            onClick={handleLoginModal} 
                            className="btn-small waves-effect waves-light header__form--btn--login"
                            type="button"
                          >
                          LOG IN
                          </button>
                          <button 
                            onClick={handleSignupModal} 
                            className="btn-small waves-effect waves-light header__form--btn--signup"
                            type="button"
                          >
                          SIGN UP
                          </button>
                      </div>
                      )
                      : (
                      <div>
                          <NavLink to="/favorites" className="btn-small waves-effect waves-light header__form--btn--favorites">WATCHLIST</NavLink>
                          <button 
                            onClick={handleLogout} 
                            className="btn-small waves-effect waves-light header__form--btn--signout"
                            type="button"
                          >
                          SIGN OUT
                          </button>
                      </div>
                      )
                  }
              </div>
          </header>
      </div>
    );
};

Header.propTypes = {
  hidden: PropTypes.bool,
  handleMovieSearch: PropTypes.func,
};

Header.defaultProps = {
  hidden: false,
  handleMovieSearch: () => {},
};

export default Header;
