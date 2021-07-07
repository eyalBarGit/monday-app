import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveList } from '../../../store/actions/boardActions'
import { useParams } from 'react-router-dom'


export function MoveList({ onToggleMoveList, currBoard, currList }) {
    const state = useSelector(state => state.boardReducer)
    const boards = Object.values(state.boards)
    const [moveToBoard, setMoveTo] = useState('')
    const dispatch = useDispatch()
    const { boardid } = useParams();


    const onSelectList = ({ target }) => {
        const moveToBoardId = target.value
        setMoveTo(moveToBoardId)
    }

    const onMoveList = () => {
        if (boardid === moveToBoard || !moveToBoard) return
        console.log('currBoard:', currBoard)
        dispatch(moveList(currBoard, currList, moveToBoard))
    }



    return (
        <div className="move-list">
            <div className="main-board-move-list">
                <select onChange={onSelectList} id="">
                    <option value="">To...</option>
                    {boards && boards.map((board) =>
                        <option value={board.id} name={board.id} key={board.id}>{board.name}</option>
                    )
                    }
                </select>
                <div className="flex space-between">
                    <button onClick={onMoveList}>Move</button>
                    <button onClick={onToggleMoveList}>X</button>
                </div>
            </div>
        </div>
    )
}

