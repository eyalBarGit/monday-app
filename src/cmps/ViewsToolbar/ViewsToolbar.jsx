import React, { useState, useEffect } from 'react';
import { AddViewMenu } from './AddViewMenu/AddViewMenu';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BsThreeDots, BsKanban } from 'react-icons/bs'
import { ViewsMenu } from './ViewsMenu/ViewsMenu';
import { useDispatch, useSelector } from 'react-redux';
import { FaTable, FaWpforms } from 'react-icons/fa'
import { AiOutlineCalendar, AiOutlinePieChart } from 'react-icons/ai'
import { useParams } from 'react-router';
import { toggleViewMenu } from '../../store/actions/boardActions'

const plusSign = <FontAwesomeIcon icon={faPlus} />

export function ViewsToolbar({ setView }) {
    const boards = useSelector(state => state.boardReducer.boards)
    const [isAddViewMenu, setAddViewMenu] = useState(false)
    const [currViewMenuId, setViewMenu] = useState(null)

    const { boardid } = useParams()
    const { views } = useSelector(state => state.boardReducer.boards[boardid])
    const [currView, setCurrView] = useState(boards[boardid].currView)

    const dispatch = useDispatch()

    const onToggleAddViews = () => {
        setAddViewMenu(!isAddViewMenu)
    }
    const onToggleViewMenu = (viewId) => {
        if (currViewMenuId === viewId) {
            setViewMenu(null)
            return
        }
        dispatch(toggleViewMenu(currViewMenuId, viewId, boardid))
        setViewMenu(viewId)
    }

    useEffect(() => {
        setCurrView(boards[boardid].currView)

    }, [currView, boardid, boards])

    const icon = (view) => {
        switch (view) {
            case "Kanban":
                return <BsKanban />
            case "Table":
                return <FaTable />
            case "Calendar":
                return <AiOutlineCalendar />
            case "Chart":
                return <AiOutlinePieChart />
            case "Form":
                return <FaWpforms />
            default:
                break;
        }
    }


    return (
        <div className="views-toolbar flex align-center" onClick={isAddViewMenu ? () => setAddViewMenu(false) : null}>
            {views && views.map((view, idx) => {
                return <div key={idx} className={`view-btn light-hover ${currViewMenuId === view.id ? 'selected' : ''}`}>
                    <button onClick={() => setView(view.type)}> <span className="icon">{icon(view.type)}</span> <span className={`view-type ${currView === view.type ? 'active' : ''}`}> {view.type}</span></button>
                    <div className="hoverable-menu">
                        <span className="dots flex align-center"> <BsThreeDots onClick={() => onToggleViewMenu(view.id)} /></span>
                        {currViewMenuId === view.id && <ViewsMenu view={view} setViewMenu={setViewMenu} boardid={boardid} />}
                    </div>
                </div>
            })}
            |
            <div className="add-views-section">
                <button className="btn-add-views light-hover" onClick={onToggleAddViews}><span className="plus-sign">{plusSign}</span>Add View</button>
                {isAddViewMenu && <AddViewMenu setAddViewMenu={setAddViewMenu} />}
            </div>
        </div >
    )



}