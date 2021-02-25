import {
    CREATE_NOTE,
    DELETE_NOTE,
    EDIT_NOTE,
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY_NOTES, CREATE_SUBCATEGORY, UPDATE_SUBCATEGORY, CREATE_LABELS, DELETE_ALL_CATEGORIES
} from "./actions";
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
                categories: state.categories.filter(category => category.id !== action.payload.id)
            }
        case DELETE_ALL_CATEGORIES:
            return {
                ...state,
                categories: [{id: 1, text: 'All', value: '', data: [], subcategories: []}],
                subcategories: []
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
                labels: [...state.labels, action.payload]
            }
        default: {
            return state
        }
    }
}