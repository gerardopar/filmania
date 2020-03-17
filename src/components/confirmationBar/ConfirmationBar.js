import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationBar = props => (
    <div className={`${props.customClass} z-depth-5`}>
        <p className="confirmation__text">{props.text}</p>
    </div>  
);

ConfirmationBar.propTypes = {
    customClass: PropTypes.string,
    text: PropTypes.string
};

ConfirmationBar.defaultProps = {
    customClass: '',
    text: ''
};

export default ConfirmationBar;
