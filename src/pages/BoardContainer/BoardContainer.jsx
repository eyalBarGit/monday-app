import React, { useEffect, } from 'react';
// import {  useSelector } from 'react-redux';
import { Kanban } from '../../cmps/Kanban/Kanban';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { Table } from '../../cmps/Table/Table';
import { useState } from 'react';
import { Route, useParams } from 'react-router';

export function BoardContainer() {
    // const state = useSelector(state => state.state)
    const [view, setView] = useState('Kanban')
    const { boardid } = useParams()

    useEffect(() => {
        console.log('boardID:', boardid)
        // component didMount
        return () => {
            // component willUnMount
        }
    }, [])


    return (
        <div className="board-container">
        <AppHeader setView={setView} />
            <hr />
            <div className="main-content-board-container">
                {/* <Route component={Kanban} path="/main/boards/board-1"></Route> */}
                {/* <Route component={Kanban} path={`/main/boards/${boardid}/kanban`}></Route> */}
                {view === 'Kanban' &&
                    <Kanban boardid={boardid} />
                }
                {view === 'Table' &&
                    <Table boardid={boardid} />
                }
            </div>


        </div>
    )



}