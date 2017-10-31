import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import activeEvent from '../src/reducers/reducer_active_event';

let reduxStore = null;

function create(apollo, initialState = {}) {
  return createStore(
    combineReducers({
      activeEvent: activeEvent,
      apollo: apollo.reducer(),
    }),
    initialState,
    compose(
      applyMiddleware(apollo.middleware()),
      composeWithDevTools(applyMiddleware(thunkMiddleware)),
    )
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
