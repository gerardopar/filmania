// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
// importing components
import Footer from '../footer/Footer';

const navigation = () => (
    <React.Fragment>
        <ul className="nav">
            <NavLink className="nav__item" to="/" activeClassName="nav__item--active" exact>POPULAR</NavLink>
            <NavLink className="nav__item" to="/adventure" activeClassName="nav__item--active" exact>ADVENTURE</NavLink>
            <NavLink className="nav__item" to="/animation" activeClassName="nav__item--active" exact>ANIMATION</NavLink>
            <NavLink className="nav__item" to="/comedy" activeClassName="nav__item--active" exact>COMEDY</NavLink>
            <NavLink className="nav__item" to="/documentary" activeClassName="nav__item--active" exact>DOCUMENTARY</NavLink>
            <NavLink className="nav__item" to="/drama" activeClassName="nav__item--active" exact>DRAMA</NavLink>
            <NavLink className="nav__item" to="/fantasy" activeClassName="nav__item--active" exact>FANTASY</NavLink>
            <NavLink className="nav__item" to="/horror" activeClassName="nav__item--active" exact>HORROR</NavLink>
            <NavLink className="nav__item" to="/scienceFiction" activeClassName="nav__item--active" exact>SCIENCE FICTION</NavLink>
            <NavLink className="nav__item" to="/thriller" activeClassName="nav__item--active" exact>THRILLER</NavLink>
        </ul>
        <Footer />
    </React.Fragment>
);

export default navigation;
