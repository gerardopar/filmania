//importing modules installed
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//importing test component
import AppRouter from '../src/routers/AppRouter';
import configureStore from './store/configureStore';

//importing style sheet
import './styles/main.scss';


//redux store initialized
const store = configureStore();

//redux store provider
const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
);

//rendering app
ReactDOM.render(jsx, document.getElementById('app'));
