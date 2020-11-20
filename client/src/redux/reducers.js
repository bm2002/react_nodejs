import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer,
  auth: authReducer
})

// const store = createStore(rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const store = createStore(reducers, applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
// import {reducer as formReducer} from 'redux-form' 
// import thunkMiddleware from 'redux-thunk'

// const reducers = combineReducers ({
//     form: formReducer,
// })

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));


export default store;


