import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export function BoardList() {
    const boardReducer = useSelector(state => state.boardReducer)
    const { boards, favBoards } = boardReducer
    const [boardList, setBoardList] = useState('')



    const getAllBoards = useCallback(
        () => {
            const allBoards = []
            for (const board in boards) {
                const currBoard = boards[board];
                allBoards.push(currBoard)
            }
            return allBoards
        },
        [boards],
    )


    const init = useCallback(() => {
        setBoardList(getAllBoards())
    },
        [getAllBoards],
    )


    useEffect(() => {
        init()
    }, [init])



    if (!boardList) return 'LOADING...'
    return (
        <div className="board-list ">
            <h2>All Boards</h2>
            <div className="board-list-container justify-center flex wrap">
                {boardList.map(board => {
                    return <div className="container margin-center flex" key={board.id}>
                        <div className="boards flex">
                            <Link to={`boards/${board.id}`}><img
                                alt="board"
                                src={require(`../../assets/images/bgs/${board.backgroundImg}.jpg`)}></img>
                                <p>{board.name}</p>
                            </Link>
                        </div>
                    </div>
                })}
            </div>
            <div className="fav-boards ">
                <h2>Favorite Boards</h2>
                <div className="fav-boards-container flex wrap">
                    {favBoards && favBoards.map(board => {
                        const currBoard = boards[board]
                        return <div className="container margin-center " key={board}>
                            <div className="boards flex ">
                                <Link to={`boards/${board}`}>
                                    <img
                                        alt="boards"
                                        src={require(`../../assets/images/bgs/${currBoard.backgroundImg}.jpg`)}></img>
                                    <p>{currBoard.name}</p>
                                </Link>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

