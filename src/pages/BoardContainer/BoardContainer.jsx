import React, { useEffect } from 'react';
// import {  useSelector } from 'react-redux';
import { Kanban } from '../../cmps/Views/Kanban/Kanban';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { TableView } from '../../cmps/Views/TableView/TableView';
import { useState } from 'react';
import { useParams } from 'react-router';
import { CalendarView } from '../../cmps/Views/Calendar/CalendarView'
import { useDispatch, useSelector } from 'react-redux';
import { setBoardView, saveToStorage } from '../../store/actions/boardActions'

export function BoardContainer() {
    const boards = useSelector(state => state.boardReducer.boards)
    const tablesState = useSelector(state => state.tableReducer.tables)
    const listsState = useSelector(state => state.listReducer.lists)
    const state = useSelector(state => state.stateReducer)

    const { boardid } = useParams()
    const activeBoard = boards[boardid]
    const [currBoard, setBoard] = useState(boards[boardid])


    const dispatch = useDispatch()

    useEffect(() => { dispatch(saveToStorage('boards', boards)) }, [boards, dispatch])
    useEffect(() => { dispatch(saveToStorage('lists', listsState)) }, [listsState, dispatch])
    useEffect(() => { dispatch(saveToStorage('tables', tablesState)) }, [tablesState, dispatch])
    useEffect(() => { dispatch(saveToStorage('state', state)) }, [state, dispatch])


    useEffect(() => {
        setBoard(activeBoard)
    }, [boardid, activeBoard, currBoard.currView])


    const setView = (view) => {
        dispatch(setBoardView(view, boardid))
    }


    return (
        <div className="board-container">
            <AppHeader setView={setView} />

            <div className="main-content-board-container flex column">
                {currBoard.currView === 'Kanban' &&
                    <Kanban boardid={boardid} />
                }
                {currBoard.currView === 'Table' &&
                    <TableView boardid={boardid} />
                }
                {currBoard.currView === 'Calendar' &&
                    <CalendarView boardid={boardid} />
                }
            </div>


        </div>
    )



}