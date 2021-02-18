import React from "react";
import {Note} from "./note";

export const NotesList = props => {

    return(
        <>
            <ul className='list-group'>
                {
                    props.items.map((item, index) => (
                        <Note
                            text={item.content}
                            id={index}
                            key={index}
                        />
                    ))
                }
            </ul>
        </>
    )
}