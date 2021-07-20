import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteBoard, removeSavedBoard } from '../../store/actions/boardActions'
// import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { AppHeaderMenu } from './AppHeaderMenu/AppHeaderMenu';
import { BlackScreen } from '../CardDetails/BlackScreen/BlackScreen';
import { ViewsToolbar } from '../ViewsToolbar/ViewsToolbar'
import { BoardToolbar } from '../BoardToolBar/BoardToolbar';
import { useParams } from 'react-router';

export function AppHeader({ setView }) {

    const state = useSelector(state => state.boardReducer)
    // const { activeBoard } = state
    const { boardid } = useParams()
    const currBoard = state.boards[boardid]
    const bottomNav = currBoard?.bottomNav
    const [isHeaderMenuVisible, setHeaderMenu] = useState(false)
    const [showSavedTitle, setSaved] = useState(false)
    const [isBoardsMenuVis, setBoardsMenuVis] = useState(false)

    const dispatch = useDispatch()


    const plusSign = <FontAwesomeIcon icon={faPlus} />
    const star = <FontAwesomeIcon icon={faStar} />
    // const listMenu = <FontAwesomeIcon icon={faEllipsisH} />


    const onSaveBoard = () => {
        if (currBoard.isFav) {
            dispatch(removeSavedBoard(currBoard))
            return
        }
        dispatch(favoriteBoard(currBoard))
        setSaved(true)
        setTimeout(() => {
            onHideSave()

        }, 500);
    }

    const onHideSave = () => {
        setSaved(false)
    }


    const onToggleAppHeaderMenu = () => {
        setHeaderMenu(!isHeaderMenuVisible)
    }




    return (
        <nav className="app-header flex column">
            <div className="container">

                {currBoard &&
                    <div className={`top-nav flex align-center ${bottomNav}`}>
                        <h1> {currBoard.name}</h1>
                        <button onClick={onSaveBoard} className={`btn btn-fav-board ${currBoard?.isFav ? 'saved' : ''}`}>{star}</button>
                        {showSavedTitle &&
                            <p className="save-notification">saved!</p>
                        }
                        {isHeaderMenuVisible &&
                            <div>
                                <span onClick={() => setHeaderMenu(false)} >
                                    <BlackScreen />
                                </span>
                                < AppHeaderMenu
                                    onRemoveSavedBoard={removeSavedBoard}
                                    currBoard={currBoard}
                                    onToggleAppHeaderMenu={onToggleAppHeaderMenu} />
                            </div>
                        }
                    </div>
                }
                <div className="mid-part flex">
                    <div className="nav-tools flex space-between align-center">
                        <div className="views-section flex align-center shadow-line">
                            <ViewsToolbar setView={setView} boardid={boardid} />

                            {/* {currBoard &&
                            <Link to="/main/homepage"><button className="home" onClick={() => setBoardsMenuVis(false)}>{home}</button></Link>
                        } */}
                            {isBoardsMenuVis &&
                                <div>
                                    <span onClick={() => setBoardsMenuVis(false)} >
                                        <BlackScreen />
                                    </span>
                                    <AppHeaderMenu closeBoard={() => setBoardsMenuVis(false)} currBoard={currBoard} />
                                </div>
                            }
                        </div>

                        <div className="right-side flex align-center">
                            {currBoard &&
                                <div>
                                    <button className="app-header-menu-btn" onClick={onToggleAppHeaderMenu}>{plusSign}</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="board-toolbar-section">
                    <BoardToolbar />
                </div>
            </div>
        </nav >
    )
}



