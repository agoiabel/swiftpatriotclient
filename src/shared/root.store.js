import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from './root.reducer';
import { createStore, compose, applyMiddleware } from 'redux';
import { loadState, saveState } from '../shared/middleware/PersistData';

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const persistedState = loadState();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk))
);

// store.subscribe(throttle(() => {
// 	saveState({
// 		course: store.getState().coursesReducer.course,
// 		courses: store.getState().coursesReducer.courses,

// 		outline: store.getState().outlinesReducer.outline,
// 		outlines: store.getState().outlinesReducer.outlines,

// 		session: store.getState().sessionsReducer.session,
// 		sessions: store.getState().sessionsReducer.sessions,

// 		facilitator: store.getState().facilitatorsReducer.facilitator,
// 		facilitators: store.getState().facilitatorsReducer.facilitators,

// 		facilitator_outlines: store.getState().facilitatorOutlinesReducer.facilitator_outlines
// 	});
// }, 1000));

export default store;