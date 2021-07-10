import React from 'react';
// import {  useSelector } from 'react-redux';
import { Kanban } from '../../cmps/Views/Kanban/Kanban';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { Table } from '../../cmps/Views/Table/Table';
import { useState } from 'react';
import {  useParams } from 'react-router';
import { CalendarView } from '../../cmps/Views/Calendar/CalendarView'


export function BoardContainer() {
    // const state = useSelector(state => state.state)
    const [view, setView] = useState('Kanban')
    const { boardid } = useParams()


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