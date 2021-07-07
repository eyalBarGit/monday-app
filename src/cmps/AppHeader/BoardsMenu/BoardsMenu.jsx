
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function BoardsMenu({ currBoard, closeBoard }) {
    const state = useSelector(state => state.boardReducer)
    const boards = Object.keys(state.boards)
    const boardid = currBoard.id
    const check = <FontAwesomeIcon icon={faCheck} />


    if (!boardid) return '...loading'
    return (
        <div className="boards-menu">
         
            <div className="main-menu-container ">
                <div className="flex column align-center space-between">
                    {boards.map(board => {
                        const currBoard = state.boards[board];
                        return <Link key={board} to={`/main/boards/${board}`} >
                            <div onClick={closeBoard} className="board-name flex">
                                <img style={{ width: '30px' }} src={require(`../../../assets/images/bgs/${currBoard.backgroundImg}.jpg`)} alt="board-background" />
                                <p key={board}>{currBoard.name}</p>
                                {boardid === currBoard.id ? <span className="check">{check}</span> : ''}
                            </div>
                        </Link>
                    }
                    )}
                </div>

            </div>
            <div className="close-board-menu flex">
            </div>
        </div >
    )



}