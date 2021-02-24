import React, {useEffect, useState} from 'react'
import {CreateNoteForm} from '../components/forms/createNoteForm';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
    CREATE_CATEGORY,
    CREATE_NOTE, CREATE_SUBCATEGORY,
    DELETE_ALL_NOTES,
    DELETE_NOTE,
    EDIT_NOTE,
    notesSelector,
    UPDATE_CATEGORY_NOTES, UPDATE_SUBCATEGORY
} from '../store/notes';
import {NotesList} from '../components/notes';
import {SelectCategoryForm} from '../components/forms/selectCategoryForm';
import {Navbar} from '../components/elements/navbar';
import {useParams} from 'react-router-dom';
import {Button} from '../components/elements';

export const Main = () => {

    const [targetPost, setTargetPost] = useState(false)
    const [selectedNotes, setSelectedNotes] = useState([])
    const [categoryNotes, setCategoryNotes] = useState([])
    const [currentCategory, setCurrentCategory] = useState({})

    const [counter, setCounter] = useState(1)

    const [backgroundColor, setBackGroundColor] = useState(false)
    const [onSubCategoryClick, setOnSubCategoryClick] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [infoMode, setInfoMode] = useState(false)
    const [selectMode, setSelectMode] = useState(false)

    const {data: notes} = useSelector(notesSelector)
    const {categories} = useSelector(notesSelector)
    const {subcategories} = useSelector(notesSelector, shallowEqual)
    const dispatch = useDispatch()

    const {path} = useParams();

    const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const currentTime = new Date().toJSON().slice(11, 19) + ` ${currentDate}`


    useEffect(() => {
        setCurrentCategory((categories.find(category => category.value === path)) || {})
        setCategoryNotes((categories.find(category => category.value === path)?.data) || [])
    }, [path, categories]);

    const onCreateNoteSubmit = async (values, {resetForm}) => {
        const itemsId = notes.map(note => note.id)
        const id = !itemsId[0] ? 1 : itemsId[0] + 1
        const result = await dispatch({
            type: CREATE_NOTE,
            payload: {id: id, title: values.title, content: values.content, created_at: currentTime}
        })
        if (result) {
            resetForm({values: ''})
        }
    }

    const onEditNoteSubmit = (values, {resetForm}) => {
        dispatch({type: EDIT_NOTE, payload: {...targetPost, content: values.content}})
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
        resetForm({values: ''})
        setEditMode(false)
        setTargetPost(false)
        setInfoMode(false)
    }

    const onDeleteNoteClick = item => {
        dispatch({type: DELETE_NOTE, payload: item.id})
        for (let i = 0; i < categories.length; i++) {
            const subCategoryWithNote = categories[i].subcategories.find(category =>
                category.data.filter(note => note.id !== item.id))
            if (subCategoryWithNote) {
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
        }
        for (let a = 0; a < subcategories.length; a++) {
            dispatch({
                type: UPDATE_SUBCATEGORY,
                payload: {...subcategories[a], data: subcategories[a].data.filter(note => note.id !== item.id)}
            })
        }
    }

    const onDeleteAllClick = () => {
        dispatch({type: DELETE_ALL_NOTES})
    }

    const onEditNoteClick = item => {
        setTargetPost(item)
        setEditMode(true)
        setInfoMode(false)
    }

    const onInfoButtonClick = item => {
        setBackGroundColor('#fcfafa')
        setTargetPost(item)
        setInfoMode(true)
        setEditMode(false)
    }

    const onNoteButtonClick = item => {
        setBackGroundColor(false)
        if (item.id === targetPost.id) {
            setInfoMode(false)
        }
    }

    const onSelectCategoryClick = () => {
        setSelectMode(true)
    }

    const onCancelCategorySelectClick = () => {
        setSelectedNotes([])
        setSelectMode(false)
    }

    const onSelectNoteClick = item => {
        setSelectedNotes([...selectedNotes, item])
        for (let i = 0; i < selectedNotes.length; i++) {
            if (selectedNotes[i].id === item.id) {
                setSelectedNotes(selectedNotes.filter(selected => selected.id !== selectedNotes[i].id))
            }
        }
    }

    const onAddToCategoryAccept = values => {
        const category = categories.find(item => item.value === values.category)
        dispatch({
            type: UPDATE_CATEGORY_NOTES,
            payload: {...category, data: selectedNotes}
        })
        setSelectedNotes([])
        setSelectMode(false)
    }

    const onCreateCategoryClick = () => {
        const itemsId = categories.map(category => category.id)
        const id = !itemsId[0] ? 1 : itemsId[0] + 1
        const name = prompt('What is category name? ', '')
        dispatch({
            type: CREATE_CATEGORY,
            payload: {id: id, text: name, value: name, data: [], subcategories: []}
        })
        setCounter(counter + 1)
    }

    const onDeleteCategoryClick = () => {
        setCounter(counter + 1)
    }

    const onChangeCategoryClick = () => {
        setOnSubCategoryClick(false)
        setCategoryNotes((categories.find(category => category.value === path)?.data) || [])
        setSelectMode(false)
        setSelectedNotes([])
        setEditMode(false)
    }

    const onCreateSubCategoryClick = () => {
        const name = prompt('Create SubCategory name')
        const itemsId = subcategories.map(subcategory => subcategory.id)
        const id = !itemsId[0] ? 1 : itemsId[0] + 1
        const subcategory = {id: id, text: name, value: name, data: []}
        dispatch({
            type: UPDATE_CATEGORY_NOTES,
            payload: {...currentCategory, subcategories: [...currentCategory.subcategories, subcategory]}
        })
        dispatch({
            type: CREATE_SUBCATEGORY, payload: subcategory
        })
    }

    const takeValueFromNavBar = value => {
        setOnSubCategoryClick(true)
        setCategoryNotes((currentCategory.subcategories.find(item => item.value === value)?.data) || [])
    }

    const onAddToSubCategoriesAccept = values => {
        const subcategory = subcategories.find(item => item.value === values.category)
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
        setSelectedNotes([])
        setSelectMode(false)
    }

    return (
        <>
            <div className='container w-75 p-2 border border-primary'>
                {!path ?
                    <>
                        <Button
                            text='Create category'
                            onClick={onCreateCategoryClick}
                        />
                        <Button
                            text='Delete all notes'
                            onClick={onDeleteAllClick}
                        />
                    </>
                    :
                    <Button
                        text='Create Subcategory'
                        onClick={onCreateSubCategoryClick}
                    />
                }
                <Navbar
                    items={categories}
                    text={!selectMode ? 'Select notes' : 'Cancel'}
                    selectButtonText='Delete category'
                    onSelectCategoryClick={!selectMode ? onSelectCategoryClick : onCancelCategorySelectClick}
                    path={path}
                    onClick={onChangeCategoryClick}
                    onDeleteCategoryClick={onDeleteCategoryClick}
                />
                {path ?
                    <Navbar
                        items={currentCategory.subcategories || []}
                        path={path}
                        onClick={takeValueFromNavBar}
                        subCategory={true}
                    />
                    : null
                }
                {selectMode ?
                    <SelectCategoryForm
                        items={!path ? categories : currentCategory.subcategories}
                        onSubmit={!path ? onAddToCategoryAccept : onAddToSubCategoriesAccept}
                    />
                    : null
                }
                {!path ?
                    <CreateNoteForm
                        onSubmit={!editMode ? onCreateNoteSubmit : onEditNoteSubmit}
                        text={!editMode ? 'Create' : 'Accept edit'}
                        editMode={editMode}
                    />
                    :
                    <>
                        {editMode ?
                            <CreateNoteForm
                                onSubmit={onEditNoteSubmit}
                                text={'Accept edit'}
                            />
                            : null
                        }
                    </>
                }
                <NotesList
                    selectMode={selectMode}
                    onDeleteNoteClick={onDeleteNoteClick}
                    onEditNoteClick={onEditNoteClick}
                    items={!path ? notes : categoryNotes}
                    infoMode={infoMode}
                    onInfoClick={!infoMode ? onInfoButtonClick : onNoteButtonClick}
                    targetPost={targetPost}
                    onSelectNoteClick={onSelectNoteClick}
                    backgroundColor={backgroundColor}
                    subCategory={onSubCategoryClick}
                />
            </div>
        </>
    )
}