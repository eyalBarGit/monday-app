import React, { useEffect } from 'react';
// import {  useSelector } from 'react-redux';
import { Kanban } from '../../cmps/Views/Kanban/Kanban';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { Table } from '../../cmps/Views/Table/Table';
import { useState } from 'react';
import { useParams } from 'react-router';
import { CalendarView } from '../../cmps/Views/Calendar/CalendarView'
import { useSelector } from 'react-redux';


export function BoardContainer() {
    const state = useSelector(state => state.boardReducer)

    const { boardid } = useParams()
    const [view, setView] = useState(state.boards[boardid].currView)

    const activeBoard = state.boards[boardid]

    const [currBoard, setBoard] = useState()

    useEffect(() => {
        setBoard(activeBoard)
        setView(activeBoard.currView)
        return () => {

        }
    }, [boardid, activeBoard,activeBoard.currView])

    return (
        <div className="board-container">
            <AppHeader setView={setView} />
            <hr />
            <div className="main-content-board-container">
                {view === 'Kanban' &&
                    <Kanban boardid={boardid} />
                }
                {view === 'Table' &&
                    <Table boardid={boardid} />
                }
                {view === 'Calendar' &&
                    <CalendarView boardid={boardid} />
                }
            </div>


        </div>
    )



}