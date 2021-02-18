import {CREATE_NOTE, DELETE_NOTE, EDIT_NOTE} from "./actions";
import {act} from "@testing-library/react";

export const getInitialState = data => ({
    loader: false,
    data,
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
        case DELETE_NOTE:
            return {
                ...state,
                data: state.data.filter(note => note.id !== action.payload)
            }
        case EDIT_NOTE:
            return {
                ...state,
                data: state.data.map(note => note.id === action.payload.id ? action.payload : note)
            }

        default: {
            return state
        }
    }
}