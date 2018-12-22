import thunk from 'redux-thunk';
import rootReducer from './root.reducer';
import { createStore, compose, applyMiddleware } from 'redux';

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = sessionStorage.getItem('reduxState') ? JSON.parse(sessionStorage.getItem('reduxState')) : {}
const store = createStore(rootReducer, persistedState, composeEnhancers(
    applyMiddleware(thunk))
);

store.subscribe(() => {
    sessionStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store;