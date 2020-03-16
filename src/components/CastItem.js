import React from 'react';
import PropTypes from 'prop-types';
// importing utility functions
import getNchars from '../utils/str';

const CastItem = ({ character, name, ...props }) => (
    <div className="movieDetails__cast--member">
        <img className="movieDetails__cast--member--img z-depth-5" src={props.profile_path !== null ? `https://image.tmdb.org/t/p/w500/${props.profile_path}` : 'https://s3-ap-southeast-1.amazonaws.com/silverscreen-photos/1534489151m000001.jpg'} alt="cast memeber" />
        <p className="movieDetails__cast--member--name">{getNchars(name, 25)}</p>
        <p className="movieDetails__cast--member--char">{getNchars(character, 25)}</p>
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
