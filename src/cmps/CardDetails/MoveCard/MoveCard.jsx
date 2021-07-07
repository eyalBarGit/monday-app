import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveToStorage } from '../../../store/actions/boardActions';
import { moveCard } from '../../../store/actions/listActions'

export function MoveCard({ currBoard, currCard, currList, onToggleMoveCard, onToggleCardDetails }) {
    const [listOptions, setListOptions] = useState()
    const dispatch = useDispatch()
    const listsState = useSelector(state => state.listReducer.lists)



    const onMoveCard = ({ target }) => {
        const listName = target.value
        const moveToList = Object.values(listsState).filter((list) => list.title === listName)
        const moveTocardIds = listsState[moveToList[0]?.id]?.cardIds
        if (!moveTocardIds) return
        if (moveTocardIds.includes(currCard.id)) return
        if (moveToList[0].id === currList.id) return
        dispatch(moveCard(currBoard, moveToList[0].id, currCard, currList))
        onToggleMoveCard()
        onToggleCardDetails()
    }



    useEffect(() => {
        setListOptions(Object.values(listsState))
        dispatch(saveToStorage('lists', listsState))
    }, [listsState, dispatch])



    return (
        <div className="copy-card">
            {listOptions &&
                <select name="" onChange={(e) => onMoveCard(e)}>
                    <option value="">To...</option>
                    {listOptions.map((list, idx) => <option key={idx}>{list.title}</option>)}
                </select>
            }
        </div>
    )
}

