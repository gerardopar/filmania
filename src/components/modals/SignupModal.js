// importing modules
import React from 'react';
import PropTypes from 'prop-types';
// importing react context
import RouteContext from '../../context/route-context';

class SignupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailError: '',
            passwordError: ''
        };
    }

    validate = (email, password) => {
        let isError = false;
        const errors = {
            emailError: '',
            passwordError: '',
        };

        if (email.length === 0) {
            isError = true;
            errors.emailError = 'Email cannot be empty';
        }

        if (password.length === 0) {
            isError = true;
            errors.passwordError = 'Password cannot be empty';
        }

        this.setState(prevState => ({ ...prevState, ...errors }));
        return isError;
    };

    // method: handles user signup
    handleSignup = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const submitErrors = this.validate(email, password); // validate user input
        if (!submitErrors) {
            fetch('https://filmania-rest-api.herokuapp.com/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, 
                password
            })
            })
            .then((res) => {
                if (res.status === 422) {
                throw new Error(
                    'Validation failed. Email already in use!'
                );
                }
                if (res.status !== 200 && res.status !== 201) {
                console.log('Error!');
                throw new Error('Creating a user failed!');
                }
                return res.json();
            })
            .then(() => {
                this.props.handleSignupModal();
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    render() {
        return (
            <div className="modal__wrap">
                <form onSubmit={this.handleSignup} className="modal__form">
                    <div className="modal__title--wrap">
                        <h3 className="modal__title">SIGN UP</h3>
                    </div>
                    <div className="modal__input--wrap">
                        <label htmlFor="email" className="modal__input--label">
                            <i className="material-icons modal__input--icon">email</i>
                            &nbsp; EMAIL
                        </label>
                        <input className="modal__input" type="email" name="email" autoComplete="off" />
                        <p className="modal__error">{this.state.emailError}</p>
                    </div>
                    <div className="modal__input--wrap">
                        <label htmlFor="password" className="modal__input--label">
                            <i className="material-icons modal__input--icon">lock</i>
                            {' '}
                            &nbsp; PASSWORD
                        </label>
                        <input className="modal__input" type="password" name="password" autoComplete="off" />
                        <p className="modal__error">{this.state.passwordError}</p>
                    </div>
                    <div className="modal__btn--wrap">
                        <button className="modal__btn--login waves-effect waves-light" type="submit">SIGN UP</button>
                    </div>
                </form>
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
    }
}

SignupModal.propTypes = {
    handleSignupModal: PropTypes.func
};

SignupModal.defaultProps = {
    handleSignupModal: () => {}
};

export default SignupModal;
