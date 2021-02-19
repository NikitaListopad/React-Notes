import React,{useState} from 'react'
import {Header} from "./header";
import {CreateNoteForm} from "../components/createNoteForm";
import {useDispatch, useSelector, useStore} from "react-redux";
import {CREATE_NOTE, DELETE_NOTE, EDIT_NOTE, notesSelector} from "../store/notes";
import {NotesList} from "../components/notes";

export const Main = () => {

    const [targetPostId, setTargetPostId] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [infoMode, setInfoMode] = useState(false)

    const {data: notes, loader} = useSelector(notesSelector)
    const dispatch = useDispatch()

    console.log(notes)

    const currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const currentTime = new Date().toJSON().slice(11, 19) + ` ${currentDate}`

    const onCreateNoteSubmit = async (values, {resetForm}) => {
        const itemsId = notes.map((note, index) => index)
        const id = itemsId.length + 1
        const result = await dispatch({type: CREATE_NOTE, payload: {id: id, content: values.content, created_at: currentTime}})
        if(result){
            resetForm({values: ''})
        }
    }

    const onEditPostSubmit = (values, {resetForm}) => {
        dispatch({type: EDIT_NOTE, payload: {id: targetPostId, content: values.content}})
        resetForm({values: ''})
        setEditMode(false)
        setTargetPostId(null)
    }

    const onDeleteNoteClick = id => {
        dispatch({type: DELETE_NOTE, payload: id})
    }

    const onEditNoteClick = id => {
        setTargetPostId(id)
        setEditMode(true)
    }

    const onInfoButtonClick = id => {
        setTargetPostId(id)
        setInfoMode(true)
    }

    const onNoteButtonClick = () => {
        setInfoMode(false)
    }


    return(
        <>
            <div className='container w-75 p-2 border border-primary'>
                <Header />
                <CreateNoteForm
                    onSubmit={!editMode ? onCreateNoteSubmit : onEditPostSubmit}
                    text={!editMode ? 'Create' : 'Accept edit'}
                />
                <NotesList
                    onDeleteNoteClick={onDeleteNoteClick}
                    onEditNoteClick={onEditNoteClick}
                    items={notes}
                    infoMode={infoMode}
                    onInfoClick={!infoMode ? onInfoButtonClick : onNoteButtonClick}
                    targetPostId={targetPostId}
                />
            </div>
        </>
    )
}