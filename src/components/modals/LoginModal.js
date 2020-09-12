// importing modules
import React, { useContext } from 'react';
// importing react context
import RouteContext from '../../context/route-context';

// TODO: bring login function inside login page
// TODO: add react-hooks form validation
// TODO: remove context

const loginModal = () => {
    const {
 handleLogin, emailError, passwordError, handleLoginModal 
} = useContext(RouteContext);
    return (
        <div className="modal__wrap">
        <form onSubmit={handleLogin} className="modal__form">
            <div className="modal__title--wrap">
                <h3 className="modal__title">LOG IN</h3>
            </div>
            <div className="modal__input--wrap">
                <label htmlFor="email" className="modal__input--label">
                    <i className="material-icons modal__input--icon">email</i>
                    &nbsp; EMAIL
                </label>
                <input className="modal__input" type="email" id="email" name="email" autoComplete="off" />
                <p className="modal__error">{emailError}</p>
            </div>
            <div className="modal__input--wrap">
                <label htmlFor="password" className="modal__input--label">
                    <i className="material-icons modal__input--icon">lock</i>
                    {' '}
                    &nbsp; PASSWORD
                </label>
                <input className="modal__input" id="password" type="password" name="password" autoComplete="off" />
                <p className="modal__error">{passwordError}</p>
            </div>
            <div className="modal__btn--wrap">
                <button className="modal__btn--login waves-effect waves-light" type="submit">LOG IN</button>
            </div>
        </form>
        <button 
          onClick={handleLoginModal}
          className="material-icons modal__btn--close"
          type="button"
        >
        cancel
        </button>
        </div>
    );
};

export default loginModal;
