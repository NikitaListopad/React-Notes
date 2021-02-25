export const CREATE_NOTE = 'CREATE_NOTE'

export const createNoteAction = (values, currentTime, notes, id) => dispatch => {
    dispatch({
        type: CREATE_NOTE,
        payload: {
            id: id,
            title: values.title,
            content: values.content,
            created_at: currentTime,
            color: `#${values.color}`,
            labels: values.labels
        }
    })
}

export const EDIT_NOTE = 'EDIT_NOTE'
export const editNoteAction = (values, targetPost) => (dispatch, getState) => {
    const {notes: data} = getState()
    const {data: notes, categories} = data
    dispatch({
        type: EDIT_NOTE,
        payload: {...notes.find(note => note.id === targetPost.id), content: values.content}
    })
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].data.find(item => item.id === targetPost.id)) {
            const subcategories = categories[i].subcategories
            for (let i = 0; i < subcategories.length; i++) {
                dispatch({
                    type: UPDATE_SUBCATEGORY,
                    payload: {
                        ...subcategories[i],
                        data: subcategories[i].data.map(item => item.id === targetPost.id ? {
                            ...item,
                            content: values.content
                        } : item)
                    }
                })
            }
            dispatch({
                type: UPDATE_CATEGORY_NOTES,
                payload: {
                    ...categories[i],
                    data: categories[i].data.map(item => item.id === targetPost.id ? {
                        ...item,
                        content: values.content
                    } : item),
                    subcategories: categories[i].subcategories.map(item => item.id === subcategories[i].id ? {
                        ...subcategories[i],
                        data: subcategories[i].data.map(item => item.id === targetPost.id ? {
                            ...item,
                            content: values.content
                        } : item)
                    } : item)
                }
            })
        }
    }
}


export const DELETE_NOTE = 'DELETE_NOTE'
export const deleteNoteAction = item => (dispatch, getState) => {
    const {notes} = getState()
    const {categories, subcategories} = notes
    dispatch({type: DELETE_NOTE, payload: item.id})
    for (let i = 0; i < categories.length; i++) {
        const subCategoryWithNote = categories[i].subcategories.find(category =>
            category.data.filter(note => note.id !== item.id))
        dispatch({
            type: UPDATE_CATEGORY_NOTES,
            payload: {
                ...categories[i],
                data: categories[i].data.filter(note => note.id !== item.id),
                subcategories: categories[i].subcategories.map(category => category.id === subCategoryWithNote.id ? {
                    ...category,
                    data: category.data.filter(note => note.id !== item.id)
                } : category)
            }
        })
    }
    for (let a = 0; a < subcategories.length; a++) {
        dispatch({
            type: UPDATE_SUBCATEGORY,
            payload: {...subcategories[a], data: subcategories[a].data.filter(note => note.id !== item.id)}
        })
    }
}

export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const deleteCategoryAction = value => dispatch => {
    dispatch({type: DELETE_CATEGORY, payload: value})
}

export const DELETE_ALL_CATEGORIES = 'DELETE_ALL_CATEGORIES'
export const deleteAllCategoriesAction = () => dispatch => {
    dispatch({type: DELETE_ALL_CATEGORIES})
}

export const CREATE_CATEGORY = 'CREATE_CATEGORY'
export const createCategoryAction = (id, values) => dispatch => {
    dispatch({
        type: CREATE_CATEGORY,
        payload: {id: id, text: values.content, value: values.content, data: [], subcategories: []}
    })
}

export const UPDATE_CATEGORY_NOTES = 'UPDATE_CATEGORY_NOTES'
export const updateCategoryAction = (values, selectedNotes) => (dispatch, getState) => {
    const {notes} = getState()
    const {categories} = notes
    const category = categories.find(item => item.value === values.category)
    dispatch({
        type: UPDATE_CATEGORY_NOTES,
        payload: {...category, data: selectedNotes}
    })
}

export const CREATE_SUBCATEGORY = 'CREATE_SUBCATEGORY'
export const createSubCategoryAction = (currentCategory, subcategory) => dispatch => {
    dispatch({
        type: UPDATE_CATEGORY_NOTES,
        payload: {...currentCategory, subcategories: [...currentCategory.subcategories, subcategory]}
    })
    dispatch({
        type: CREATE_SUBCATEGORY, payload: subcategory
    })
}


export const UPDATE_SUBCATEGORY = 'UPDATE_SUBCATEGORY'
export const subCategoryUpdateAction = (subcategory, currentCategory, selectedNotes) => dispatch => {
    dispatch({
        type: UPDATE_SUBCATEGORY,
        payload: {...subcategory, data: [...subcategory.data, ...selectedNotes]}
    })
    dispatch({
        type: UPDATE_CATEGORY_NOTES, payload: {
            ...currentCategory,
            subcategories: currentCategory.subcategories.map(item => item.id === subcategory.id ? {
                ...subcategory,
                data: selectedNotes
            } : item)
        }
    })
}

export const CREATE_LABELS = 'CREATE_LABELS'
export const createLabelAction = (value, id) => dispatch => {
    dispatch({type: CREATE_LABELS, payload: {id: id, value: value.content}})
}