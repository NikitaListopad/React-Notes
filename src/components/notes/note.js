import React from "react";
import {Button, Input} from "../elements";


export const Note = props => {

    return (
        <>
            <li key={props.id}
                className='list-group-item d-flex flex-md-column pt-2 mt-3 border-top'
                style={{backgroundColor: props.item.color}}
            >
                <p className='m-0 p-0'><em>{props.item.title}</em></p>
                <div className=' d-flex justify-content-between mt-3'>
                    {props.selectMode ?
                        <div className='form-check'>
                            <Input type='checkbox'
                                   className='form-check form-check-input'
                                   onChange={() => props.onSelectNoteClick(props.item)}
                            />
                        </div>
                        : null
                    }
                    <span className={`rounded p-2 text-break mx-1 w-75 mr-5 ${props.infoMode ? 'text-muted' : ''}`}>
                    {(props.targetPost.id === props.item.id) && props.infoMode ? `Created at: ${props.item.created_at}` : props.item.content}
                    </span>
                    <div className='btn-group'>
                        <Button
                            text={(props.targetPost.id === props.item.id) && props.infoMode ? 'Note' : 'Info'}
                            disabled={(props.targetPost.id !== props.item.id) && props.infoMode}
                            onClick={() => props.onInfoClick(props.item)}
                        />
                        {!props.subCategory ?
                            <>
                                <Button
                                    onClick={() => props.onEditNoteClick(props.item)}
                                    className='btn btn-outline-primary'
                                    text='Edit Note'
                                />
                                <Button
                                    onClick={() => props.onDeleteNoteClick(props.item)}
                                    className='btn btn-outline-primary'
                                    text='Delete Note'
                                />
                            </>
                            : null
                        }

                    </div>
                </div>
                <p className='m-0 mt-3 text-left'><span
                    className='text-muted mr-5'>Labels:</span>{props.item.labels.map(label => <span
                    key={label.id}>&ensp;{label.value}</span>)}
                </p>
            </li>
        </>
    )
}