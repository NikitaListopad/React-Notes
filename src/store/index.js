import {createStore, applyMiddleware, combineReducers} from "redux";
import {notes} from "./notes";
import { composeWithDevTools } from 'redux-devtools-extension';


const reducers = combineReducers({
    notes
})

export const store = createStore(reducers, composeWithDevTools())
