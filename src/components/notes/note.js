import React from "react";
import {Button} from "../elements";


export const Note = props => {


    return (
        <>
            <li key={props.id} className='list-group-item list-group-item-action d-flex justify-content-between'>
                    <span className='text-break mx-1 w-75 mr-5'>
                        {props.text}
                    </span>
                    <span className='sup text-muted blockquote-footer'>
                        {`Created at ${props.createdDate}`}
                    </span>
                <div className='btn-group'>
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