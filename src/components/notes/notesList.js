import React from "react";
import {Note} from "./note";

export const NotesList = props => {

    return(
        <>
            <ul className='list-group'>
                {
                    props.items.map(item => (
                        <Note
                            onDeleteNoteClick={props.onDeleteNoteClick}
                            onEditNoteClick={props.onEditNoteClick}
                            text={item.content}
                            id={item.id}
                            key={item.id}
                        />
                    ))
                }
            </ul>
        </>
    )
}