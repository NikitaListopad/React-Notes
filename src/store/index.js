import {createStore, applyMiddleware, combineReducers} from "redux";
import {notes} from "./notes";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'notes',
    storage,
    whitelist: ['notes']
}

const reducers = combineReducers({
    notes
})

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)
