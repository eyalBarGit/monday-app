import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import { createNewList } from '../../store/actions/listActions'
import { addNewListId } from '../../store/actions/boardActions'
import { useDispatch } from 'react-redux';
import { ActionForm } from '../ActionForm/ActionForm';

export function AddList({ currBoard, onToggleAddList }) {
    const dispatch = useDispatch()
    const { reset } = useForm();
    const listName = useRef(null);


    const onCreateList = async (data) => {
        if (!data.listName) return
        const newList = await dispatch(createNewList(data.listName))
        dispatch(addNewListId(newList, currBoard))
        reset()
        onToggleAddList()
    }

    return (
        <div className="add-list ">
            <ActionForm
                name={"listName"}
                toggleAdd={onToggleAddList}
                placeholder={'Enter list title'}
                onSubmitFunc={onCreateList}
                currRef={listName}
            />

        </div>
    )
}

