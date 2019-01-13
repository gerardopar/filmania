import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import testReducer from '../reducers/testReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//creating the redux store: 
export default () => {
    const store = createStore (combineReducers({
        test: testReducer,
      }),
      
      composeEnhancers(applyMiddleware(thunk))
    );

    return store;
  };