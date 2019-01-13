import React from 'react';

// creates a global state
export default React.createContext({
    handleLogin: () => {}, // login handler
    handleLoginModal: () => {}, // login modal handler
    handleLogout: () => {}, // logout handler
    isAuth: null // isAuth state
});