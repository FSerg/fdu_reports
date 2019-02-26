import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import 'semantic-ui-css/semantic.min.css';
import './style.css';

import rootReducer from './reducers';
//import { AUTH_SUCCESS } from './actions/authTypes';
import { getCurrentUser } from './actions/authActions';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import history from './history';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(reduxThunk))
);

const token = localStorage.getItem('token');
if (token) {
  // store.dispatch({ type: AUTH_SUCCESS });
  store.dispatch(getCurrentUser());
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
