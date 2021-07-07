import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { setCardDesc } from '../../../../store/actions/cardActions'




export function AddDescription({ currCard, onToggleCardDesc }) {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();

    const onCancel = () => {
        onToggleCardDesc()
    }

    const onAddDesc = ({ desc }) => {
        dispatch(setCardDesc( currCard, desc))
        onToggleCardDesc()
    }


    return (
        <div className="add-description">
            <form onSubmit={handleSubmit(onAddDesc)}>
                <textarea defaultValue={currCard.desc} name="desc" ref={register} cols="30" rows="10"></textarea>
                <div className="btns flex space-between">
                    <button style={{backgroundColor:"rgb(76, 187, 61)"}}>Save</button>
                    <button onClick={onCancel}>X</button>
                </div>
            </form>

        </div>
    )
}

