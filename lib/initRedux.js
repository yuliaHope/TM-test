import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import activeEvent from '../src/reducers/reducer_active_event';

let reduxStore = null;

let devtools = f => f
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

function create(apollo, initialState = {}) {
  return createStore(
    combineReducers({
      activeEvent: activeEvent,
      apollo: apollo.reducer(),
    }),
    initialState,
    compose(
      applyMiddleware(apollo.middleware()),
      devtools,
    ),
  )
}

export default function initRedux(apollo, initialState) {
  if (!process.browser) {
    return create(apollo, initialState);
  }

  if (!reduxStore) {
    reduxStore = create(apollo, initialState);
  }

  return reduxStore;
}
