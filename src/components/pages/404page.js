//importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
//importing image
import _404_img from '../../assets/img/404-img.png';

const NotFoundPage = () => (
    <div className="errorPage">
        <div className="errorPage__col--one">
            <h1 className="errorPage__num">4</h1>
            <img className="errorPage__img" src={_404_img} />
            <h1 className="errorPage__num">4</h1>
        </div>
        <p className="errorPage__text">page not found</p>
        <NavLink className="waves-effect waves-light errorPage__btn" to="/">RETURN HOME</NavLink>
    </div>
);

export default NotFoundPage;