import React,{useState} from 'react'
import {Header} from "./header";
import {CreateNoteForm} from "../components/createNoteForm";
import {useDispatch, useSelector, useStore} from "react-redux";
import {CREATE_NOTE, notesSelector} from "../store/notes";
import {NotesList} from "../components/notes";

export const Main = () => {

    const {data: notes, loader} = useSelector(notesSelector)
    const dispatch = useDispatch()

    console.log(notes)

    const onCreateNoteSubmit = async (values, {resetForm}) => {
        console.log(values)
        const result =await dispatch({type: CREATE_NOTE, payload: values})
        if(result){
            resetForm({values: ''})
        }
    }

    return(
        <>
            <div className='container w-75 p-2 border border-primary'>
                <Header />
                <CreateNoteForm
                    onSubmit={onCreateNoteSubmit}
                />
                <NotesList
                    items={notes}
                />
            </div>
        </>
    )
}