import React, {useState} from 'react'
import {Header} from "./header";
import {CreateNoteForm} from "../components/forms/createNoteForm";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_NOTE, DELETE_NOTE, EDIT_NOTE, notesSelector} from "../store/notes";
import {NotesList} from "../components/notes";
import {SelectCategoryForm} from "../components/forms/selectCategoryForm";
import {Navbar} from "../components/elements/navbar";
import {useParams} from "react-router-dom";
import {Button} from "../components/elements";

export const Main = () => {

    const [targetPostId, setTargetPostId] = useState(null)
    const [selectedNotes, setSelectedNotes] = useState([])

    const [editMode, setEditMode] = useState(false)
    const [infoMode, setInfoMode] = useState(false)
    const [selectMode, setSelectMode] = useState(false)

    const {data: notes} = useSelector(notesSelector)
    const dispatch = useDispatch()

    const {path} = useParams();

    const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const currentTime = new Date().toJSON().slice(11, 19) + ` ${currentDate}`

    const categoryNotes = path ? JSON.parse(localStorage.getItem(path)) : []

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

    const onEditPostSubmit = (values, {resetForm}) => {
        dispatch({type: EDIT_NOTE, payload: {id: targetPostId, content: values.content}})
        resetForm({values: ''})
        setEditMode(false)
        setTargetPostId(null)
        setInfoMode(false)
    }

    const onDeleteNoteClick = id => {
        dispatch({type: !path ? DELETE_NOTE : `DELETE_FROM_${path.toUpperCase()}`, payload: id})
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

    const categories = [{text: 'All', value: ''}]

    for (let key in {...localStorage}) {
        if (key !== 'persist:notes') {
            categories.push({text: key, value: key})
        }
    }

    const onAddToCategoryAccept = values => {
        const alsoAdded = JSON.parse(localStorage.getItem(values.category))
        const toAdd = selectedNotes.filter(note => note.id !== alsoAdded.find(item => item.id === note.id)?.id)
        localStorage.setItem(values.category, JSON.stringify([...alsoAdded, ...toAdd]))
        setSelectedNotes([])
        setSelectMode(false)
    }

    const onCreateCategoryClick = () => {
        const name = prompt('What is category name? ', '')
        localStorage.setItem(name.toLowerCase(), JSON.stringify([]))
    }


    return (
        <>
            <div className='container w-75 p-2 border border-primary'>
                <Button
                    text='Create category'
                    onClick={onCreateCategoryClick}
                />
                <Header/>
                <Navbar
                    items={categories}
                    text={!selectMode ? 'Add note to category' : 'Cancel'}
                    onSelectCategoryClick={!selectMode ? onSelectCategoryClick : onCancelCategorySelectClick}
                    path={path}
                />
                {selectMode ?
                    <SelectCategoryForm
                        items={categories}
                        onSubmit={onAddToCategoryAccept}
                    />
                    : null
                }
                {!path ?
                    <CreateNoteForm
                        onSubmit={!editMode ? onCreateNoteSubmit : onEditPostSubmit}
                        text={!editMode ? 'Create' : 'Accept edit'}
                    />
                    : null
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