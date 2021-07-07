import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeListName } from '../../store/actions/listActions'
import { useForm } from "react-hook-form";

export function ChangeListTitle({ toggleEditTitle, currBoard, currList }) {
    const dispatch = useDispatch()
    const { register, handleSubmit} = useForm();
    const title = useRef(null);
    const onSaveNewTitle = (data) => {
        dispatch(changeListName(currBoard, currList, data.newTitle))
        toggleEditTitle()
    }

    useEffect(() => {
        title.current.focus();
    })



    return (
        <div className="change-list-title">
            <form onSubmit={handleSubmit(onSaveNewTitle)}>
                <input
                    autoComplete="off"
                    ref={(e) => {
                        register(e)
                        title.current = e
                    }}
                    name="newTitle"
                    style={{ width: '100%' }}
                    type="text" />
                <div className="flex space-between">
                    <button style={{backgroundColor:"rgb(76, 187, 61)"}} type="submit">Save</button>
                    <button onClick={toggleEditTitle}>X</button>
                </div>
            </form>
        </div>
    )
}

