import React, {useState} from 'react'
import {Header} from "./header";
import {CreateNoteForm} from "../components/createNoteForm";
import {useDispatch, useSelector, useStore} from "react-redux";
import {CREATE_NOTE, DELETE_NOTE, EDIT_NOTE, notesSelector} from "../store/notes";
import {NotesList} from "../components/notes";
import {Button} from "../components/elements";

export const Main = () => {

    const [targetPostId, setTargetPostId] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [infoMode, setInfoMode] = useState(false)
    const [selectMode, setSelectCategoryMode] = useState(true)
    const [selectedNotes, setSelectedNotes] = useState([])

    const {data: notes, loader} = useSelector(notesSelector)
    const dispatch = useDispatch()

    const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const currentTime = new Date().toJSON().slice(11, 19) + ` ${currentDate}`

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
        dispatch({type: DELETE_NOTE, payload: id})
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

    const onSelectNoteClick = item => {
       setSelectedNotes([...selectedNotes, item])
        for(let i = 0; i < selectedNotes.length; i++) {
            if(selectedNotes[i].id === item.id) {
                setSelectedNotes(selectedNotes.filter(test => test.id !== selectedNotes[i].id))
            }
        }
    }


    return (
        <>
            <div className='container w-75 p-2 border border-primary'>
                <Header/>
                <Button
                    type='button'
                    text='Test accept select'

                />
                <CreateNoteForm
                    onSubmit={!editMode ? onCreateNoteSubmit : onEditPostSubmit}
                    text={!editMode ? 'Create' : 'Accept edit'}
                />
                <NotesList
                    selectMode={selectMode}
                    onDeleteNoteClick={onDeleteNoteClick}
                    onEditNoteClick={onEditNoteClick}
                    items={notes}
                    infoMode={infoMode}
                    onInfoClick={!infoMode ? onInfoButtonClick : onNoteButtonClick}
                    targetPostId={targetPostId}
                    onSelectNoteClick={onSelectNoteClick}
                />
            </div>
        </>
    )
}