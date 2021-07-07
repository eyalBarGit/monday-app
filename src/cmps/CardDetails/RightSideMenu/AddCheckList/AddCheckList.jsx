import React, { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";

export function AddCheckList({ onToggleCheckList, onAddCheckList }) {
    const { register, handleSubmit } = useForm();
    const checklistName = useRef(null)

    useEffect(() => {
        checklistName.current.focus();
        return () => {
            
        }
    }, [])


    return (
        <div className="add-check-list">
            <form onSubmit={handleSubmit(onAddCheckList)}>
                <input style={{ marginBlockEnd: '5px' }} autoComplete="off" ref={(e) => {
                    register(e)
                    checklistName.current = e
                }} name="checklistName" type="text" />
                <div className="check-list-btns flex space-between">
                    <button style={{backgroundColor:"rgb(76, 187, 61)"}}>Add</button>
                    <button onClick={onToggleCheckList}>Cancel</button>

                </div>
            </form>
        </div>
    )
}

