// importing modules
import React from 'react';
import PropTypes from 'prop-types';

const signupModal = props => (
    <div className="modal__wrap">
        <form onSubmit={props.handleSignup} className="modal__form">
            <div className="modal__title--wrap">
                <h3 className="modal__title">SIGN UP</h3>
            </div>
            <div className="modal__input--wrap">
                <label htmlFor="email" className="modal__input--label">
                    <i className="material-icons modal__input--icon">email</i>
                    &nbsp; EMAIL
                </label>
                <input className="modal__input" type="email" name="email" autoComplete="off" />
            </div>
            <div className="modal__input--wrap">
                <label htmlFor="password" className="modal__input--label">
                    <i className="material-icons modal__input--icon">lock</i>
                    {' '}
                    &nbsp; PASSWORD
                </label>
                <input className="modal__input" type="password" name="password" autoComplete="off" />
                { props.signupError !== null ? <div className="errors__signup"><p>{props.signupError}</p></div> : null }
            </div>
            <div className="modal__btn--wrap">
                <button className="modal__btn--login waves-effect waves-light" type="submit">SIGN UP</button>
            </div>
        </form>
            <button 
              onClick={props.handleSignupModal} 
              className="material-icons modal__btn--close"
              type="button"
            >
                cancel
            </button>
    </div>
);

signupModal.propTypes = {
    signupError: PropTypes.string,
    handleSignup: PropTypes.func,
    handleSignupModal: PropTypes.func
};

signupModal.defaultProps = {
    signupError: '',
    handleSignup: () => {},
    handleSignupModal: () => {}
};

export default signupModal;
