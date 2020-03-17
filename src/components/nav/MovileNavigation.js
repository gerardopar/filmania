// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import RouteContext from '../../context/route-context';
// importing components
import Footer from '../footer/Footer';

const mobileNavigation = props => (
    <React.Fragment>
    <RouteContext.Consumer>
    {routeContext => (
    <ul className="mobile__nav--wrap">
        <div className="mobile__nav--header">
            <button 
              className="material-icons waves-effect waves-light mobile__nav--btn--close" 
              onClick={props.handleMobileNav}
              type="button"
            >
            close
            </button>
        </div>
        {
            routeContext.isAuth === false
                ? (
                <React.Fragment>
                    <button type="button" onClick={routeContext.handleLoginModal} className="mobile__nav--btn--login">LOG IN</button>
                    <button type="button" onClick={props.handleSignupModal} className="mobile__nav--btn--signup">SIGN UP</button>
                </React.Fragment>   
                )
                : (
                <React.Fragment>
                    <button type="button" onClick={routeContext.handleLogout} className="mobile__nav--btn--signout">SIGN OUT</button>
                    <NavLink to="/favorites" className="mobile__nav--item">WATCHLIST</NavLink>
                </React.Fragment>
                )
            }
                <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/" activeClassName="nav__item--active" exact>POPULAR</NavLink>
                <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/adventure" activeClassName="nav__item--active" exact>ADVENTURE</NavLink>
                <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/animation" activeClassName="nav__item--active" exact>ANIMATION</NavLink>
                <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/comedy" activeClassName="nav__item--active" exact>COMEDY</NavLink>
                <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/documentary" activeClassName="nav__item--active" exact>DOCUMENTARY</NavLink>
                <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/drama" activeClassName="nav__item--active" exact>DRAMA</NavLink>
                <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/fantasy" activeClassName="nav__item--active" exact>FANTASY</NavLink>
                <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/horror" activeClassName="nav__item--active" exact>HORROR</NavLink>
                <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/scienceFiction" activeClassName="nav__item--active" exact>SCIENCE FICTION</NavLink>
                <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/thriller" activeClassName="nav__item--active" exact>THRILLER</NavLink>
                <Footer />
    </ul>
    )
    }
    </RouteContext.Consumer>
    </React.Fragment>
);

mobileNavigation.propTypes = {
    handleMobileNav: PropTypes.func,
    handleSignupModal: PropTypes.func
};

mobileNavigation.defaultProps = {
    handleMobileNav: () => {},
    handleSignupModal: () => {}
};

export default mobileNavigation;
