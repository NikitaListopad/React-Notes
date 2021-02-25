import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {
    createNoteAction,
    DELETE_ALL_NOTES,
    deleteNoteAction,
    notesSelector,
    onCreateCategoryAction,
    onCreateLabelAction,
    onEditNoteAction,
    onSubCategoryUpdateAction,
    onUpdateCategoryAction,
} from '../store/notes';
import {NotesList} from '../components/notes';
import {Button, Navbar} from '../components/elements';
import {noteValidation, labelValidation} from "../validationShema";
import {colors} from "../constants/colors";
import {CreateNoteForm, SelectCategoryForm} from "../components/forms";

export const Main = () => {

    const [targetPost, setTargetPost] = useState(false)
    const [selectedNotes, setSelectedNotes] = useState([])
    const [categoryNotes, setCategoryNotes] = useState([])
    const [currentCategory, setCurrentCategory] = useState({})
    const [counter, setCounter] = useState(1)

    const [createdWindow, setCreatedWindow] = useState(false)
    const [onSubCategoryClick, setOnSubCategoryClick] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [infoMode, setInfoMode] = useState(false)
    const [selectMode, setSelectMode] = useState(false)
    const [categoryCreating, setCategoryCreating] = useState(false)

    const {data: notes, categories, labels, subcategories} = useSelector(notesSelector)
    const dispatch = useDispatch()

    const {path} = useParams();

    const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const currentTime = new Date().toJSON().slice(11, 19) + ` ${currentDate}`

    useEffect(() => {
        setCurrentCategory((categories.find(category => category.value === path)) || {})
        setCategoryNotes((categories.find(category => category.value === path)?.data) || [])
    }, [path, categories]);

    const onCreateNoteSubmit = (values, {resetForm}) => {
        const itemsId = notes.map(note => note.id)
        const id = !itemsId[0] ? 1 : itemsId[0] + 1
        dispatch(createNoteAction(values, currentTime, notes, id))
        resetForm({values: ''})
    }

    const onEditNoteSubmit = (values, {resetForm}) => {
        dispatch(onEditNoteAction(values, targetPost))
        resetForm({values: ''})
        setEditMode(false)
        setTargetPost(false)
        setInfoMode(false)
    }

    const onDeleteNoteClick = item => {
        dispatch(deleteNoteAction(item))
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
        setTargetPost(item)
        setInfoMode(true)
        setEditMode(false)
    }

    const onNoteButtonClick = item => {
        setTargetPost(false)
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
        dispatch(onUpdateCategoryAction(values, selectedNotes))
        setSelectedNotes([])
        setSelectMode(false)
    }

    const onCreateCategoryClick = () => {
        setCreatedWindow(true)
        setCategoryCreating(true)
    }

    const onCreateCategorySubmit = values => {
        const itemsId = categories.map(category => category.id)
        const id = !itemsId[0] ? 1 : itemsId[0] + 1
        const isValid = []
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].value === values.content) {
                isValid.push(1)
            }
        }
        if (isValid.length <= 0) {
            dispatch(onCreateCategoryAction(id, values))
            setCreatedWindow(false)
            setCategoryCreating(false)
        } else {
            alert('Category with this name has already been')
        }
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
        dispatch(onCreateSubCategoryClick(currentCategory, subcategory))
    }

    const takeValueFromNavBar = value => {
        setOnSubCategoryClick(true)
        setCategoryNotes((currentCategory.subcategories.find(item => item.value === value)?.data) || [])
    }

    const onAddToSubCategoriesAccept = values => {
        const subcategory = subcategories.find(item => item.value === values.category)
        dispatch(onSubCategoryUpdateAction(subcategory, currentCategory, selectedNotes))
        setSelectedNotes([])
        setSelectMode(false)
    }

    const onCreateLabelClick = () => {
        setEditMode(true)
        setCreatedWindow(true)
    }

    const onCreateItemSubmit = (value, {resetForm}) => {
        const ids = []
        const isValid = []
        for (let i = 0; i < labels.length; i++) {
            ids.unshift(labels[i].id)
            if (labels[i].value === value.content) {
                isValid.push(1)
            }
        }
        const id = ids.length <= 0 ? 1 : ids[0] + 1
        if (isValid.length <= 0) {
            dispatch(onCreateLabelAction(value, id))
            resetForm({values: ''})
            setEditMode(false)
            setCreatedWindow(false)
        } else {
            alert('Label with this name also created')
        }
    }

    return (
        <>
            <div className='container w-75 p-2 border border-primary'>
                {!path ?
                    (
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
                    )
                    :
                    (
                        <Button
                            text='Create Subcategory'
                            onClick={onCreateSubCategoryClick}
                        />
                    )
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
                    (
                        <Navbar
                            items={currentCategory.subcategories || []}
                            path={path}
                            onClick={takeValueFromNavBar}
                            subCategory={true}
                        />
                    )
                    : null
                }
                {selectMode ?
                    (
                        <SelectCategoryForm
                            items={!path ? categories : currentCategory.subcategories}
                            onSubmit={!path ? onAddToCategoryAccept : onAddToSubCategoriesAccept}
                        />
                    )
                    : null
                }
                <>
                    {!createdWindow ?
                        (
                            <>
                                {!path ?
                                    (
                                        <CreateNoteForm
                                            onSubmit={!editMode ? onCreateNoteSubmit : onEditNoteSubmit}
                                            text={!editMode ? 'Create' : 'Accept edit'}
                                            editMode={editMode}
                                            colors={colors}
                                            validation={noteValidation}
                                            onCreateLabelClick={onCreateLabelClick}
                                            labels={labels}
                                        />
                                    )
                                    :
                                    <>
                                        {editMode ?
                                            (
                                                <CreateNoteForm
                                                    onSubmit={onEditNoteSubmit}
                                                    text='Accept edit'
                                                />
                                            )
                                            : null
                                        }
                                    </>
                                }
                            </>
                        )
                        :
                        (
                            <CreateNoteForm
                                onSubmit={!categoryCreating ? onCreateItemSubmit : onCreateCategorySubmit}
                                text='Accept'
                                placeholder='Write your text'
                                createWindow={createdWindow}
                                validation={labelValidation}
                            />
                        )
                    }
                </>
                <NotesList
                    selectMode={selectMode}
                    onDeleteNoteClick={onDeleteNoteClick}
                    onEditNoteClick={onEditNoteClick}
                    items={!path ? notes : categoryNotes}
                    infoMode={infoMode}
                    onInfoClick={!infoMode ? onInfoButtonClick : onNoteButtonClick}
                    targetPost={targetPost}
                    onSelectNoteClick={onSelectNoteClick}
                    subCategory={onSubCategoryClick}
                />
            </div>
        </>
    )
}