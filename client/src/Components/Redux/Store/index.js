import reducer from "../Reducer/index.js";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';



const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))
export default store;