import React from "react";
import {Button, Input} from "../elements";


export const Note = props => {


    return (
        <>
            <li key={props.id}
                className='list-group-item list-group-item-action d-flex justify-content-between'
                style={props.targetPostId === props.item.id ? {backgroundColor : props.backgroundColor} : null}
            >
                {props.selectMode  ?
                <div className='form-check'>
                    <Input type='checkbox'
                           className='form-check form-check-input'
                           onChange={() => props.onSelectNoteClick(props.item)}
                    />
                </div>
                    : null
                }
                <span className={`text-break mx-1 w-75 mr-5 ${props.infoMode ? 'text-muted' : ''}`}>
                    {(props.targetPostId === props.item.id) && props.infoMode ? `Created at: ${props.item.created_at}` : props.item.content}
                    </span>
                <div className='btn-group'>
                    <Button
                        text={(props.targetPostId === props.item.id) && props.infoMode ? 'Note' : 'Info'}
                        disabled={(props.targetPostId !== props.item.id) && props.infoMode}
                        onClick={() => props.onInfoClick(props.item.id)}
                    />
                    <Button
                        onClick={() => props.onEditNoteClick(props.item.id)}
                        className='btn btn-outline-primary'
                        text='Edit Note'
                    />
                    <Button
                        onClick={() => props.onDeleteNoteClick(props.item.id)}
                        className='btn btn-outline-primary'
                        text='Delete Note'
                    />
                </div>
            </li>
        </>
    )
}