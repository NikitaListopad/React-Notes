import {CREATE_NOTE} from "./actions";
import {act} from "@testing-library/react";

export const getInitialState = data => ({
    loader: false,
    data,
    error: false
})

export const successHandler = (action, payload) => ({
    type: success(action),
    payload,
    error: false
})

export const success = (action) => `${action}_SUCCESS`
export const error = (action) => `${action}_SUCCESS`

const initialState = getInitialState([])
export const notes = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTE:
            return {
                ...state,
                data:[...state.data, action.payload],
            }
        case success(CREATE_NOTE):
            return {
                ...state,
                loader: false,
                data:action.payload
            }
        default: {
            return state
        }
    }
}