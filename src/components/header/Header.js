// importing modules
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// importing react context
import RouteContext from '../../context/route-context';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleMovieSearchSubmit = (e) => {
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
        this.props.history.push(`/movie/${movie.movieId}`);
    })
    .catch(err => (err));
    }
}

  render() {
    return (
      (
        <div>
        <RouteContext.Consumer>
        {routeContext => (
            <header className="header z-depth-5">
                    <div>
                        <NavLink to="/" className="header__title">FILMANIA</NavLink>
                    </div>
                    {
                        this.props.hidden 
                            ? <div />
                            : (
                            <form onSubmit={this.handleMovieSearchSubmit} className="header__form z-depth-5">
                                <input 
                                  onChange={this.props.handleMovieSearch} 
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
                    routeContext.isAuth === false
                        ? (
                        <div>
                            <button 
                              onClick={routeContext.handleLoginModal} 
                              className="btn-small waves-effect waves-light header__form--btn--login"
                              type="button"
                            >
                            LOG IN
                            </button>
                            <button 
                              onClick={routeContext.handleSignupModal} 
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
                              onClick={routeContext.handleLogout} 
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
            )
        }
        </RouteContext.Consumer>
        </div>
    )
    );
  }
} 

Header.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  hidden: PropTypes.bool,
  handleMovieSearch: PropTypes.func,
};

Header.defaultProps = {
  history: {},
  hidden: false,
  handleMovieSearch: () => {},
};

export default withRouter(Header);
