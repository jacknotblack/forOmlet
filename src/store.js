import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
// import { layoutEpics } from './layout/actions';
// import { hallInitEpic, getHallEpic } from './modules/hall/actions';
import {epics} from './actions';
// import layoutReducers from './layout/reducers';
// import hallReducers from './modules/hall/reducers';
import playReducers from './reducers';



// console.log(Object.values(epics))
const rootEpic = combineEpics(
  ...Object.values(epics)
  // Object.values(epics)
  // hallInitEpic,
  // getHallEpic,
  // ...playEpics,
  // ...layoutEpics,
);
const epicMiddleware = createEpicMiddleware();
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
export const rootReducer = combineReducers({
  // layout: layoutReducers,
  // hall: hallReducers,
  play: playReducers,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(
    epicMiddleware,
  )),
);
epicMiddleware.run(rootEpic);

export default store;
