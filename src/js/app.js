import React from 'react'
import { render } from 'react-dom';
import {Router, hashHistory} from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import combineReducer from './reducers/reducer';
let store = createStore(combineReducer);
import routes from './config/routes';


render(<Provider store={store}><Router history={hashHistory} routes={routes} /></Provider>, document.getElementById('App'));