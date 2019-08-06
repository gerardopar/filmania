// importing modules installed
import React from 'react';
import ReactDOM from 'react-dom';

// importing test component
import AppRouter from './routers/AppRouter';

// importing style sheet
import './styles/main.scss';

// redux store provider
const jsx = (
    <AppRouter />
);

// rendering app
ReactDOM.render(jsx, document.getElementById('app'));
