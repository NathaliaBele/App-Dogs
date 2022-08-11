import { applyMiddleware, createStore } from 'redux';
// import reducer from './reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension"
import dogsReducer from '../redux/dogsDucks';

const store = createStore(dogsReducer, composeWithDevTools(applyMiddleware(thunk)))//

 export default store;