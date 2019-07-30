import React from 'react';

// creates a global state
export default React.createContext({
    handleLogin: () => {}, // login handler
    loginError: null, // login error
    handleLoginModal: () => {}, // login modal handler
    handleLogout: () => {}, // logout handler
    isAuth: null, // isAuth state
    showMobileNav: null, // showMobileNav state
    handleNavCollapse: () => {} // nav collapse state
});