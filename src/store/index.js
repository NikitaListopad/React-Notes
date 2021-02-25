import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {notes} from "./notes";

const persistConfig = {
    key: 'notes',
    storage,
    whitelist: ['notes']
}

const reducers = combineReducers({
    notes
})

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)
