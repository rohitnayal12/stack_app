// src/store/store.js

import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk from 'redux-thunk'; // You can use Redux Thunk middleware for handling asynchronous actions
// import { composeWithDevTools } from 'redux-devtools-extension'; // Optional, for Redux DevTools integration

// Import your reducers here (you will need to create them)
import authReducer from './AuthReducer/authReducer';
import forumReducer from './forumReducer/forumReducer';
import answerReducer from "./answerReducer"
// Combine multiple reducers if you have more than one
const rootReducer = combineReducers({
  auth: authReducer,
  forum: forumReducer,
  answer: answerReducer
  // Add more reducers here as needed
});

// Configure the initial state if necessary


// Create the Redux store
const store = legacy_createStore(
  rootReducer,
 
  applyMiddleware(thunk)
);

export default store;
