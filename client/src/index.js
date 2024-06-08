import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware,compose}from "redux"
import {legacy_createStore as createStore} from 'redux'
import { thunk } from 'redux-thunk'; 
import Reducers from './reducers'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

   <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</Provider>


 
 
 
);

