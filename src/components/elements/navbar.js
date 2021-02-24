import React from "react";
import {Button} from "./button";
import {Link} from "react-router-dom";

export const Navbar = props => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
            <div>
                {props.subCategory ?
                    <span className='text-muted'>Subcategories:</span>
                    : null
                }
                {props.items.map((item, index) =>
                    <>
                        {!props.subCategory ?
                            <Link to={item.value} key={index}>
                                <Button
                                    type='button'
                                    key={index}
                                    onClick={() => props.onClick(item.value)}
                                    text={item.text}
                                />
                            </Link>
                            :
                            <Button
                            type='button'
                            key={index}
                            onClick={() => props.onClick(item.value)}
                            text={item.text}
                            />
                        }
                    </>
                )}
            </div>
            <>
                {!props.subCategory ?
                    (
                        <>
                            {/*{!props.path ?*/}
                            <Button
                                type='button'
                                className=''
                                onClick={props.onSelectCategoryClick}
                                text={props.text}
                            />
                            {/*    :*/}
                            {/*    <Link to='/'>*/}
                            {/*        <Button*/}
                            {/*            type='button'*/}
                            {/*            className=''*/}
                            {/*            onClick={props.onDeleteCategoryClick}*/}
                            {/*            text={props.selectButtonText}*/}
                            {/*        />*/}
                            {/*    </Link>*/}
                            {/*}*/}
                        </>
                    )
                    : null
                }
            </>
        </nav>
    )
}