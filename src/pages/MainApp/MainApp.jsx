import React from 'react';
import { Route } from 'react-router';
import { SideBar } from '../../cmps/SideBar/SideBar';
import { CardDetails } from '../../cmps/CardDetails/CardDetails';
import { BoardContainer } from '../BoardContainer/BoardContainer';
import { InboxPage } from '../InboxPage/InboxPage'
import { useSelector } from 'react-redux';

export function MainApp() {
    const theme = useSelector(state => state.stateReducer.theme)
    return (
        <div className={`main-app ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
            <div className="main-content flex">
                <SideBar />
                <Route component={BoardContainer} path="/main/boards/:boardid/:listid?/:cardid?" />
                <Route component={CardDetails} path="/main/boards/:boardid/:listid?/:cardid?" />
                <Route component={InboxPage} path="/main/inbox" />
            </div>
        </div>
    )
}

