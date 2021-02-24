import React from "react";
import {Note} from "./note";

export const NotesList = props => {

    return(
        <>
            <ul className='list-group'>
                {
                    props.items.map(item => (
                        <Note
                            backgroundColor={props.backgroundColor}
                            onDeleteNoteClick={props.onDeleteNoteClick}
                            onEditNoteClick={props.onEditNoteClick}
                            item={item}
                            key={item.id}
                            infoMode={props.infoMode}
                            onInfoClick={props.onInfoClick}
                            targetPostId={props.targetPostId}
                            selectMode={props.selectMode}
                            onSelectNoteClick={props.onSelectNoteClick}
                        />
                    ))
                }
            </ul>
        </>
    )
}