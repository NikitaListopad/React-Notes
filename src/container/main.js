import React,{useState} from 'react'
import {Header} from "./header";
import {CreateNoteForm} from "../components/createNoteForm";
import {useDispatch, useSelector, useStore} from "react-redux";
import {CREATE_NOTE, DELETE_NOTE, notesSelector} from "../store/notes";
import {NotesList} from "../components/notes";

export const Main = () => {

    const [targetPostId, setTargetPostId] = useState(null)

    const {data: notes, loader} = useSelector(notesSelector)
    const dispatch = useDispatch()

    const onCreateNoteSubmit = async (values, {resetForm}) => {
        const itemsId = notes.map((note, index) => index)
        const id = itemsId.length + 1
        const result = await dispatch({type: CREATE_NOTE, payload: {id: id, content: values.content}})
        if(result){
            resetForm({values: ''})
        }
    }

    const onDeleteNoteClick = id => {
        dispatch({type: DELETE_NOTE, payload: id})
    }

    const onEditNoteClick = id => {
        setTargetPostId(id)
    }

    const onEditPostSubmit = values => {

    }

    return(
        <>
            <div className='container w-75 p-2 border border-primary'>
                <Header />
                <CreateNoteForm
                    onSubmit={onCreateNoteSubmit}
                />
                <NotesList
                    onDeleteNoteClick={onDeleteNoteClick}
                    items={notes}
                />
            </div>
        </>
    )
}