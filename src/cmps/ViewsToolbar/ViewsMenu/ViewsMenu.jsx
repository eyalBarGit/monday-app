import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteView, addToFavorites } from '../../../store/actions/boardActions';
import PropTypes from 'prop-types'; // ES6

export function ViewsMenu({ view, setViewMenu, boardid }) {
    const dispatch = useDispatch()

    const onDeleteView = () => {
        dispatch(deleteView(view.id, boardid))
        setViewMenu(false)
    }

    const onAddToFavorites = () => {
        dispatch(addToFavorites(view.id, boardid))
    }

    useEffect(() => {
        console.log('view:', view)
    }, [view])
    return (
        <div className="views-menu menu-shadow">
            <ul>
                <li onClick={onAddToFavorites}>Add to my favorites</li>
                <li>Rename</li>
                <li>Duplicate</li>
                <li onClick={onDeleteView}>Delete</li>
                <li className={`${view.isDefault ? "disabled" : ''}`}>Set as board default</li>
            </ul>
        </div>
    )


}
ViewsMenu.propTypes = {
    view: PropTypes.object.isRequired,
    boardid: PropTypes.string.isRequired,
    setViewMenu: PropTypes.func.isRequired,
}