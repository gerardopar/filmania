// importing modules
import React from 'react';
// importing react context
import RouteContext from '../../context/route-context';

const signupModal = () => (
    <div className="modal__wrap">
    <RouteContext.Consumer>
        {routeContext => (
        <form onSubmit={routeContext.handleSignup} className="modal__form">
            <div className="modal__title--wrap">
                <h3 className="modal__title">SIGN UP</h3>
            </div>
            <div className="modal__input--wrap">
                <label htmlFor="email" className="modal__input--label">
                    <i className="material-icons modal__input--icon">email</i>
                    &nbsp; EMAIL
                </label>
                <input className="modal__input" type="email" name="email" autoComplete="off" />
                <p className="modal__error">{routeContext.emailError}</p>
            </div>
            <div className="modal__input--wrap">
                <label htmlFor="password" className="modal__input--label">
                    <i className="material-icons modal__input--icon">lock</i>
                    {' '}
                    &nbsp; PASSWORD
                </label>
                <input className="modal__input" type="password" name="password" autoComplete="off" />
                <p className="modal__error">{routeContext.emailError}</p>
            </div>
            <div className="modal__btn--wrap">
                <button className="modal__btn--login waves-effect waves-light" type="submit">SIGN UP</button>
            </div>
        </form>
        )}
    </RouteContext.Consumer>
    <RouteContext.Consumer>
        {routeContext => (
            <button 
              onClick={routeContext.handleSignupModal} 
              className="material-icons modal__btn--close"
              type="button"
            >
                cancel
            </button>
            )}
    </RouteContext.Consumer>
    </div>
);

export default signupModal;
