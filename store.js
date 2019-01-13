import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducers';

const exampleInitialState = {
  projects: {}
}

export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
