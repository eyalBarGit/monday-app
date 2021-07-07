import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteList, copyList } from '../../store/actions/listActions'
import { removeListId,addCopiedListId } from '../../store/actions/boardActions'
import { addCopiedCards } from '../../store/actions/cardActions'
import { useParams } from 'react-router';

export function ListMenu({ toggleListMenu, currList, toggleAddCard, toggleEditTitle, onToggleMoveList }) {
    const dispatch = useDispatch()
    const cards = useSelector(state => state.cardReducer.cards)
    const boards = useSelector(boards => boards.boardReducer)
    const { boardid } = useParams()
    const currBoard = boards.boards[boardid]

    const onDeleteList = () => {
        dispatch(removeListId(currBoard, currList.id))
        dispatch(deleteList(currBoard, currList))
    }

    const onCreateCard = () => {
        toggleAddCard()
    }

    const onCopyList = async () => {
        try {
            const copiedList = await dispatch(copyList(currBoard, currList, cards))
            if (copiedList) {
                const { id } = copiedList.copiedList
                dispatch(addCopiedCards(copiedList.copiedCards))
                dispatch(addCopiedListId(id, currBoard))
            }
        } catch (err) {
            throw err
        }
    }

    const onEditTitle = () => {
        toggleEditTitle()
    }



    const clicked = useCallback(
        () => {
            toggleListMenu()
        },
        [toggleListMenu],
    )


    useEffect(() => {
        window.addEventListener('click', clicked)
        return () => {
            window.removeEventListener('click', clicked)
        }
    }, [clicked])



    return (
        <div className="list-menu">
            <div className="menu-main-content">
                <div className="title margin-center">
                    <p onClick={toggleListMenu} className="close-btn" >X</p>
                    <p>List Actions</p>
                </div>
                <div className="menu-options ">
                    <div className="option flex align-center">
                        <p onClick={onCreateCard}>Add Card...</p>
                    </div>
                    <div onClick={onCopyList} className="option flex align-center">
                        <p>Copy List...</p>
                    </div>
                    <div onClick={onToggleMoveList} className="option flex align-center">
                        <p>Move List...</p>
                    </div>
                    <div onClick={onEditTitle} className="option flex align-center">
                        <p>Edit Title...</p>
                    </div>
                    <div onClick={onDeleteList} className="option delete flex align-center">
                        <p>Delete List...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

