import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { copyCard } from '../../../store/actions/cardActions'
import { addNewCard } from '../../../store/actions/listActions';


export function CopyCard({ lists, currBoard, currCard, onToggleCopyCard }) {
    const [listOptions, setListOptions] = useState()


    const dispatch = useDispatch()

    const onCopyCard = async ({ target }) => {
        try {

            const listName = target.value
            const copyToList = Object.values(lists).filter((list) => list.title === listName)
            const newCard = await dispatch(copyCard(currBoard, copyToList[0].id, currCard))
            dispatch(addNewCard(copyToList[0], newCard))
            onToggleCopyCard()
        } catch (err) {
            throw err
        }
    }



    useEffect(() => {
        setListOptions(Object.values(lists))
    }, [currBoard, lists])


    return (
        <div className="copy-card">
            {listOptions &&
                <select name="" onChange={(e) => onCopyCard(e)}>
                    <option value="">To...</option>
                    {listOptions.map((list, idx) => <option key={idx}>{list.title}</option>)}
                </select>
            }
        </div>
    )
}

