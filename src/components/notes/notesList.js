import React from "react";
import {Note} from "./note";

export const NotesList = props => {

    return(
        <>
            <ul className='list-group'>
                {
                    props.items.map(item => (
                        <Note
                            subCategory={props.subCategory}
                            backgroundColor={props.backgroundColor}
                            onDeleteNoteClick={props.onDeleteNoteClick}
                            onEditNoteClick={props.onEditNoteClick}
                            item={item}
                            key={item.id}
                            infoMode={props.infoMode}
                            onInfoClick={props.onInfoClick}
                            targetPost={props.targetPost}
                            selectMode={props.selectMode}
                            onSelectNoteClick={props.onSelectNoteClick}
                        />
                    ))
                }
            </ul>
        </>
    )
}