import React, { useEffect} from 'react';
import { useSelector } from 'react-redux';

export function TableTaskPreview({ taskId }) {
    const cards = useSelector(state => state.cardReducer.cards)

    // const loadCurrTask = () => {

    // }

    useEffect(() => {
        console.log('cards:', cards)
        // component didMount
        return () => {
            // component willUnMount
        }
    }, [cards])


    return (
        <div className="table-task-preview">


        </div>
    )



}