import React, {useState} from 'react'
import {Header} from "./header";
import {CreateNoteForm} from "../components/forms/createNoteForm";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_NOTE, DELETE_NOTE, EDIT_NOTE, notesSelector} from "../store/notes";
import {NotesList} from "../components/notes";
import {categories} from "../constants/categoies";
import {SelectCategoryForm} from "../components/forms/selectCategoryForm";
import {Navbar} from "../components/elements/navbar";
import {categoriesSelector} from "../store/categories";

export const Main = () => {

    const [targetPostId, setTargetPostId] = useState(null)
    const [selectedNotes, setSelectedNotes] = useState([])


    const [editMode, setEditMode] = useState(false)
    const [infoMode, setInfoMode] = useState(false)
    const [selectMode, setSelectMode] = useState(false)



    const {data: notes} = useSelector(notesSelector)
    const {home, work, school} = useSelector(categoriesSelector)
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

    const onSelectCategoryClick = () => {
        setSelectMode(true)
        console.log('Works')
    }

    const onCancelCategorySelectClick = () => {
        setSelectMode(false)
    }

    const onSelectNoteClick = item => {
        setSelectedNotes([...selectedNotes, item])
        for (let i = 0; i < selectedNotes.length; i++) {
            if (selectedNotes[i].id === item.id) {
                setSelectedNotes(selectedNotes.filter(test => test.id !== selectedNotes[i].id))
            }
        }
    }

    const onAddToCategoryAccept = values => {
        setSelectMode(false)
        console.log(values)
        console.log(`ADD_TO_${values.category}`)
        dispatch({type: `ADD_TO_${values.category}`, payload: selectedNotes})
    }

    return (
        <>
            <div className='container w-75 p-2 border border-primary'>
                <Header/>
                <Navbar
                    items={categories}
                    text={!selectMode ? 'Add note to category' : 'Cancel'}
                    onSelectCategoryClick={!selectMode ? onSelectCategoryClick : onCancelCategorySelectClick}
                />
                {selectMode ?
                    <SelectCategoryForm
                        items={categories}
                        onSubmit={onAddToCategoryAccept}
                    />
                    : null
                }
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