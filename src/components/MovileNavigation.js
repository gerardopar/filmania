import React from 'react';
import { NavLink } from 'react-router-dom';
import RouteContext from '../context/route-context';
import Footer from './Footer';


const MobileNavigation = (props) => (
    <React.Fragment>
    <RouteContext.Consumer>
    {routeContext => {
        return (
    <ul className="mobile__nav--wrap">
        <div className="mobile__nav--header">
            <button 
                className="material-icons waves-effect waves-light mobile__nav--btn--close" 
                onClick={props.handleMobileNav}>close</button>
        </div>
        {
            routeContext.isAuth === false
                ?   <React.Fragment>
                        <button onClick={routeContext.handleLoginModal} className="mobile__nav--btn--login">LOG IN</button>
                        <button onClick={props.handleSignupModal} className="mobile__nav--btn--signup">SIGN UP</button>
                    </React.Fragment>
                :   <React.Fragment>
                        <button onClick={routeContext.handleLogout} className="mobile__nav--btn--signout" >SIGN OUT</button>
                        <NavLink to="/favorites" className="mobile__nav--item">FAVORITES</NavLink>
                    </React.Fragment>
        }
        <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/" activeClassName="nav__item--active" exact={true}>POPULAR</NavLink>
        <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/adventure" activeClassName="nav__item--active" exact={true}>ADVENTURE</NavLink>
        <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/animation" activeClassName="nav__item--active" exact={true}>ANIMATION</NavLink>
        <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/comedy" activeClassName="nav__item--active" exact={true}>COMEDY</NavLink>
        <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/documentary" activeClassName="nav__item--active" exact={true}>DOCUMENTARY</NavLink>
        <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/drama" activeClassName="nav__item--active" exact={true}>DRAMA</NavLink>
        <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/fantasy" activeClassName="nav__item--active" exact={true}>FANTASY</NavLink>
        <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/scienceFiction" activeClassName="nav__item--active" exact={true}>SCIENCE FICTION</NavLink>
        <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/thriller" activeClassName="nav__item--active" exact={true}>THRILLER</NavLink>
        <NavLink onClick={routeContext.handleNavCollapse} className="mobile__nav--item" to="/horror" activeClassName="nav__item--active" exact={true}>HORROR</NavLink>
        <Footer />
    </ul>
    )}
    }
    </RouteContext.Consumer>
    </React.Fragment>
);

export default MobileNavigation;