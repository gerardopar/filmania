import React from 'react';
import RouteContext from '../context/route-context';

const LoginModal = (props) => (
    <div className="modal__wrap">
        <RouteContext.Consumer>
            {routeContext => {
            return (
                <form onSubmit={routeContext.handleLogin} className="modal__form">
                    <div className="modal__title--wrap">
                        <h3 className="modal__title">LOG IN</h3>
                    </div>
                    <div className="modal__input--wrap">
                        <label htmlFor="email" className="modal__input--label">
                            <i className="material-icons modal__input--icon">email</i>&nbsp; EMAIL
                        </label>
                        <input className="modal__input" type="email" name="email" autoComplete="off"/>
                    </div>
                    <div className="modal__input--wrap">
                        <label htmlFor="password" className="modal__input--label">
                            <i className="material-icons modal__input--icon">lock</i> &nbsp; PASSWORD
                        </label>
                        <input className="modal__input" type="password" name="password" autoComplete="off"/>
                    </div>
                    <div className="modal__btn--wrap">
                        <button className="modal__btn--login waves-effect waves-light" type="submit">LOG IN</button>
                    </div>
                </form>
            );
            }}
        </RouteContext.Consumer>
        <RouteContext.Consumer>
            {routeContext => {
            return (
                <button 
                    onClick={routeContext.handleLoginModal}
                    className="material-icons modal__btn--close">
                cancel</button>
                );
            }}
        </RouteContext.Consumer>
    </div>
)

export default LoginModal;