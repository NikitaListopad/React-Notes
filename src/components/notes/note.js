import React from "react";
import {Button} from "../elements";


export const Note = props => {


    return (
        <>
            <li key={props.id} className='list-group-item list-group-item-action d-flex justify-content-between'>
                    <span className={`text-break mx-1 w-75 mr-5 ${props.infoMode ? 'text-muted' : ''}`}>
                        {/*{!props.infoMode ? props.text : `Created at: ${props.createdAt}`}*/}
                        {(props.targetPostId === props.id) && props.infoMode ? `Created at: ${props.createdAt}` : props.text}
                    </span>
                <div className='btn-group'>
                    <Button
                        text={props.infoMode ? 'Note' : 'Info'}
                        onClick={() => props.onInfoClick(props.id)}
                    />
                    <Button
                        onClick={() => props.onEditNoteClick(props.id)}
                        className='btn btn-outline-primary'
                        text='Edit Note'
                    />
                    <Button
                        onClick={() => props.onDeleteNoteClick(props.id)}
                        className='btn btn-outline-primary'
                        text='Delete Note'
                    />
                </div>
            </li>
        </>
    )
}