import React, {useState} from 'react'
import {Header} from "./header";
import {CreateNoteForm} from "../components/forms/createNoteForm";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_NOTE, DELETE_ALL_NOTES, DELETE_NOTE, EDIT_NOTE, notesSelector} from "../store/notes";
import {NotesList} from "../components/notes";
import {SelectCategoryForm} from "../components/forms/selectCategoryForm";
import {Navbar} from "../components/elements/navbar";
import {useParams} from "react-router-dom";
import {Button} from "../components/elements";

export const Main = () => {

    const [targetPostId, setTargetPostId] = useState(null)
    const [selectedNotes, setSelectedNotes] = useState([])
    const categories = [{text: 'All', value: ''}]

    const [counter, setCounter] = useState(1)

    const [editMode, setEditMode] = useState(false)
    const [infoMode, setInfoMode] = useState(false)
    const [selectMode, setSelectMode] = useState(false)

    const {data: notes} = useSelector(notesSelector)
    const dispatch = useDispatch()

    const {path} = useParams();
    const {subcategory} = useParams();

    const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const currentTime = new Date().toJSON().slice(11, 19) + ` ${currentDate}`

    const categoryNotes = path !== 'home' ? JSON.parse(localStorage.getItem(path))?.all : []

    const subCategoryNotes = []

    console.log(subcategory)

    for (let key in {...localStorage}) {
        if (key !== 'persist:notes') {
            categories.push({text: key, value: key})
        }
    }

    const onCreateNoteSubmit = async (values, {resetForm}) => {
        const itemsId = notes.map(note => note.id)
        const id = !itemsId[0] ? 1 : itemsId[0] + 1
        const result = await dispatch({
            type: CREATE_NOTE,
            payload: {id: id, content: values.content, created_at: currentTime}
        })
        if (result) {
            resetForm({values: ''})
        }
    }

    const onEditNoteSubmit = (values, {resetForm}) => {
        dispatch({type: EDIT_NOTE, payload: {id: targetPostId, content: values.content}})
        if (path) {
            const currentCategoryNotes = JSON.parse(localStorage.getItem(path))
            localStorage.setItem(path, JSON.stringify(currentCategoryNotes.map(note => note.id === targetPostId ? {
                id: targetPostId,
                content: values.content
            } : note)))
        }
        resetForm({values: ''})
        setEditMode(false)
        setTargetPostId(null)
        setInfoMode(false)
    }

    const onDeleteNoteClick = id => {
        dispatch({type: DELETE_NOTE, payload: id})
        if (path) {
            const currentCategoryNotes = JSON.parse(localStorage.getItem(path))
            localStorage.setItem(path, JSON.stringify(currentCategoryNotes.filter(note => note.id !== id)))
        }
    }

    const onDeleteAllClick = () => {
        localStorage.clear()
        dispatch({type: DELETE_ALL_NOTES})
    }

    const onEditNoteClick = id => {
        setTargetPostId(id)
        setEditMode(true)
        setInfoMode(false)
    }

    const onInfoButtonClick = id => {
        setTargetPostId(id)
        setInfoMode(true)
        setEditMode(false)
    }

    const onNoteButtonClick = id => {
        if (id === targetPostId) {
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
        const alsoAdded = JSON.parse(localStorage.getItem(values.category))
        const toAdd = selectedNotes.filter(note => note.id !== alsoAdded.all.find(item => item.id === note.id)?.id)
        localStorage.setItem(values.category, JSON.stringify({
            all: [...alsoAdded.all, ...toAdd]
        }))
        setSelectedNotes([])
        setSelectMode(false)
    }

    const onCreateCategoryClick = () => {
        const name = prompt('What is category name? ', '')
        localStorage.setItem(name.toLowerCase(), JSON.stringify({all: []}))
        setCounter(counter + 1)
    }

    const onDeleteCategoryClick = () => {
        localStorage.removeItem(path)
        setCounter(counter + 1)
    }

    const onChangeCategoryClick = () => {
        setSelectMode(false)
        setSelectedNotes([])
        setEditMode(false)
    }

    const onCreateSubCategoryClick = () => {
        const name = prompt('Create SubCategory name')
        const currentData = JSON.parse(localStorage.getItem(path))
        localStorage.setItem(path, JSON.stringify({all: currentData.all, [name]: []}))
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
                <Header/>
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
                        items={[{text: 'subcategory1'}]}
                    />
                    : null}
                {selectMode ?
                    <SelectCategoryForm
                        items={categories}
                        onSubmit={onAddToCategoryAccept}
                    />
                    : null
                }
                {!path ?
                    <CreateNoteForm
                        onSubmit={!editMode ? onCreateNoteSubmit : onEditNoteSubmit}
                        text={!editMode ? 'Create' : 'Accept edit'}
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
                    targetPostId={targetPostId}
                    onSelectNoteClick={onSelectNoteClick}
                />
            </div>
        </>
    )
}