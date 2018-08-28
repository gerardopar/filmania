import React from 'react';
import webpack_icon from '../assets/webpack-icon.png';

// test component
const Test = () => {
    return(
        <div>
            <div className="test__container">
                <img className="test__img" src={webpack_icon} alt="webpack icon"/>
            </div>
        </div>
    );
};

export default Test;