import React from "react";
import {Note} from "./note";

export const NotesList = props => {

    return(
        <>
            <ul>
                {
                    props.items.map(item => (
                        <Note
                            text={item.content}
                            id={item.id}
                        />
                    ))
                }
            </ul>
        </>
    )
}