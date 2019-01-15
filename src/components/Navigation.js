import React from 'react';
import { NavLink } from 'react-router-dom';

import Footer from './Footer';

const Navigation = (props) => (
    <React.Fragment>
        <ul className="nav">
            <NavLink className="nav__item" to="/" activeClassName="nav__item--active" exact={true}>POPULAR</NavLink>
            <NavLink className="nav__item" to="/adventure" activeClassName="nav__item--active" exact={true}>ADVENTURE</NavLink>
            <NavLink className="nav__item" to="/animation" activeClassName="nav__item--active" exact={true}>ANIMATION</NavLink>
            <NavLink className="nav__item" to="/comedy" activeClassName="nav__item--active" exact={true}>COMEDY</NavLink>
            <NavLink className="nav__item" to="/documentary" activeClassName="nav__item--active" exact={true}>DOCUMENTARY</NavLink>
            <NavLink className="nav__item" to="/drama" activeClassName="nav__item--active" exact={true}>DRAMA</NavLink>
            <NavLink className="nav__item" to="/fantasy" activeClassName="nav__item--active" exact={true}>FANTASY</NavLink>
            <NavLink className="nav__item" to="/horror" activeClassName="nav__item--active" exact={true}>HORROR</NavLink>
            <NavLink className="nav__item" to="/scienceFiction" activeClassName="nav__item--active" exact={true}>SCIENCE FICTION</NavLink>
            <NavLink className="nav__item" to="/thriller" activeClassName="nav__item--active" exact={true}>THRILLER</NavLink>
        </ul>
        <Footer />
    </React.Fragment>
)

export default Navigation;

