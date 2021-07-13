import React, { useState, useEffect } from 'react';
import { AddViewMenu } from './AddViewMenu/AddViewMenu';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BsThreeDots, BsKanban } from 'react-icons/bs'
import { ViewsMenu } from './ViewsMenu/ViewsMenu';
import { useSelector } from 'react-redux';
import { FaTable, FaWpforms } from 'react-icons/fa'
import { AiOutlineCalendar, AiOutlinePieChart } from 'react-icons/ai'
import { useParams } from 'react-router';
// import { useRouteMatch } from 'react-router-dom';

export function ViewsToolbar({ setView, boardid }) {
    const plusSign = <FontAwesomeIcon icon={faPlus} />
    const [isAddViewMenu, setAddViewMenu] = useState(false)
    const [isViewMenu, setViewMenu] = useState(false)
    // const { boardid } = useParams()
    const { views } = useSelector(state => state.boardReducer.boards[boardid])
    // const { path, url } = useRouteMatch()
    const onToggleAddViews = () => {
        setAddViewMenu(!isAddViewMenu)
    }
    const onToggleViewMenu = () => {
        setViewMenu(!isViewMenu)
    }
    useEffect(() => {
        // console.log('path:', path)
        // console.log('url:', url)

    }, [])

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
                return <div key={idx} className="view-btn">
                    <button onClick={() => setView(view.type)}> <span className="icon">{icon(view.type)}</span> <span className="view-type"> {view.type}</span></button>
                    <div className="hoverable-menu">
                        <span className="dots flex align-center"> <BsThreeDots onClick={onToggleViewMenu} /></span>
                        {isViewMenu && <ViewsMenu view={view} setViewMenu={setViewMenu} boardid={boardid} />}
                    </div>
                </div>
            })}
            |
            <div className="add-views-section">
                <button className="btn-add-views" onClick={onToggleAddViews}><span className="plus-sign">{plusSign}</span>Add View</button>
                {isAddViewMenu && <AddViewMenu setAddViewMenu={setAddViewMenu} />}
            </div>
        </div >
    )



}