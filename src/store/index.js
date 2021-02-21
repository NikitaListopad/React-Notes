import {createStore, applyMiddleware, combineReducers} from "redux";
import {notes} from "./notes";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {categoriesReducer} from "./categories";


const persistConfig = {
    key: 'notes',
    storage,
    whitelist: ['notes', 'categoriesReducer']
}

const reducers = combineReducers({
    notes,
    categoriesReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)
