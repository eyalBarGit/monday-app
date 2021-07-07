import React, { useEffect, useState, } from 'react';
import { AddViewMenu } from '../AddViewMenu/AddViewMenu';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function ViewsToolbar({ setView }) {
    const plusSign = <FontAwesomeIcon icon={faPlus} />
    const [isViewMenu, setViewMenu] = useState(false)
    const { views } = useSelector(state => state.boardReducer)


    const onToggleAddViews = () => {
        setViewMenu(!isViewMenu)
    }
    useEffect(() => {
        // component didMount
        return () => {
            // component willUnMount
        }
    }, [])


    return (
        <div className="views-toolbar flex align-center" onClick={isViewMenu ? () => setViewMenu(false) : null}>
            {views && views.map((view, idx) => {
                return <Link key={idx} to="/main/boards/board-1/kanban"><div key={idx} className="view-btn">

                    <button onClick={() => setView(view)}> {view}</button>

                </div>
                </Link>
            })}
            |
            <div className="add-views-section">
                <button className="btn-add-views" onClick={onToggleAddViews}><span className="plus-sign">{plusSign}</span>Add View</button>
                {isViewMenu && <AddViewMenu setViewMenu={setViewMenu} />}
            </div>
        </div >
    )



}