import React from 'react';
import PropTypes from 'prop-types';

const CastItem = ({ character, name, ...props }) => (
    <div className="movieDetails__cast--member">
        <img className="movieDetails__cast--member--img z-depth-5" src={`https://image.tmdb.org/t/p/w500/${props.profile_path}`} alt="cast memeber" />
        <p className="movieDetails__cast--member--name">{name}</p>
        <p className="movieDetails__cast--member--char">{character}</p>
    </div>
);

CastItem.propTypes = {
    character: PropTypes.string,
    name: PropTypes.string,
    profile_path: PropTypes.string
};

CastItem.defaultProps = {
    character: 'N/A',
    name: 'N/A',
    profile_path: 'N/A'
};

export default CastItem;
