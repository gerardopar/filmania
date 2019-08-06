import React from 'react';
import tmdbLogo from '../../assets/img/the-movie-db.png';

const footer = () => (
    <footer className="footer">
        <a href="https://www.themoviedb.org/?_dc=1547147159" target="_blank" rel="noopener noreferrer">
            <img className="footer__img" src={'https://www.themoviedb.org/assets/1/v4/logos/293x302-powered-by-square-green-3ee4814bb59d8260d51efdd7c124383540fc04ca27d23eaea3a8c87bfa0f388d.png' || tmdbLogo} alt="logo" />
        </a>
        <p className="footer__text">
            &copy; 2019 FILMANIA 
            {' '}
            <br />
            All Rights Reserved.
        </p>
    </footer>
);

export default footer;
