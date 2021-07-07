import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import { createCard } from '../../store/actions/cardActions'
import { addNewCard } from '../../store/actions/listActions'

import { useDispatch } from 'react-redux';
import { ActionForm } from '../ActionForm/ActionForm';

export function AddCard({  currList, toggleAddCard }) {
    const dispatch = useDispatch()
    const { reset } = useForm();
    const cardTitle = useRef(null);

    const onCreateCard = async (data) => {
        try {
            if (!data.cardTitle) return
            const card = await dispatch(createCard(data.cardTitle))
            dispatch(addNewCard(currList, card))
            reset()
            toggleAddCard()
        }
        catch (err) {
            throw err
        }
    }

    return (
        <div className="add-card ">
            <ActionForm
                name={"cardTitle"}
                currRef={cardTitle}
                toggleAdd={toggleAddCard}
                placeholder={'Enter card title'}
                onSubmitFunc={onCreateCard} />

        </div>
    )
}

