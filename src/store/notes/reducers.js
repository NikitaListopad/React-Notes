import {
    DELETE_ALL_NOTES,
    CREATE_NOTE,
    DELETE_NOTE,
    EDIT_NOTE,
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY_NOTES, CREATE_SUBCATEGORY, UPDATE_SUBCATEGORY, CREATE_LABELS
} from "./constants";
import {getInitialState} from "../../helpers/redux";

const initialState = getInitialState([])
export const notes = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTE:
            return {
                ...state,
                data: [action.payload, ...state.data],
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
        case CREATE_CATEGORY:
            return {
                ...state,
                categories: [action.payload, ...state.categories]
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(category => category.value !== action.payload.value)
            }
        case DELETE_ALL_NOTES:
            return {
                ...state,
                data: []
            }
        case UPDATE_CATEGORY_NOTES:
            return {
                ...state,
                categories: state.categories.map(category => category.id === action.payload.id ? action.payload : category)
            }
        case CREATE_SUBCATEGORY:
            return {
                ...state,
                subcategories: [action.payload, ...state.subcategories]
            }
        case UPDATE_SUBCATEGORY:
            return {
                ...state,
                subcategories: state.subcategories.map(item => item.id === action.payload.id ? action.payload : item)
            }
        case CREATE_LABELS:
            return {
                ...state,
                labels: [action.payload, ...state.labels]
            }
        default: {
            return state
        }
    }
}