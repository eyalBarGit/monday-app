import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function TaskPreview({ taskId }) {
    const cards = useSelector(state => state.cardReducer.cards)

    const loadCurrTask = () => {

    }

    useEffect(() => {
        console.log('cards:', cards)
        // component didMount
        return () => {
            // component willUnMount
        }
    }, [])


    return (
        <div className="task-preview">


        </div>
    )



}