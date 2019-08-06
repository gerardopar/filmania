// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// importing react context
import RouteContext from '../../context/route-context';

const header = props => (
    <div>
    <RouteContext.Consumer>
    {routeContext => (
        <header className="header z-depth-5">
                <div>
                    <NavLink to="/" className="header__title">FILMANIA</NavLink>
                </div>
                {
                    props.hidden 
                        ? <div />
                        : (
                        <form onSubmit={props.handleMovieSearchSubmit} className="header__form z-depth-5">
                            <input 
                              onChange={props.handleMovieSearch} 
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
                          onClick={props.handleSignupModal} 
                          className="btn-small waves-effect waves-light header__form--btn--signup"
                          type="button"
                        >
                        SIGN UP
                        </button>
                    </div>
                    )
                    : (
                    <div>
                        <NavLink to="/favorites" className="btn-small waves-effect waves-light header__form--btn--favorites">FAVORITES</NavLink>
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
);

header.propTypes = {
  hidden: PropTypes.bool,
  handleMovieSearch: PropTypes.func,
  handleMovieSearchSubmit: PropTypes.func,
  handleSignupModal: PropTypes.func
};

header.defaultProps = {
  hidden: true,
  handleMovieSearch: () => {},
  handleMovieSearchSubmit: () => {},
  handleSignupModal: () => {}
};

export default header;
