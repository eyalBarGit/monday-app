import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteView,addToFavorites } from '../../../store/actions/boardActions';

export function ViewsMenu({ view, setViewMenu, boardid }) {
    // const state = useSelector(state => state.state)
    const dispatch = useDispatch()


    const onDeleteView = () => {
        console.log('view:', view)
        dispatch(deleteView(view.id, boardid))
        setViewMenu(false)
    }

    const onAddToFavorites = () => {
        dispatch(addToFavorites(view.id, boardid))

    }


    return (
        <div className="views-menu">
            <ul>
                <li className={`${view.isDefault ? "disabled" : ''}`} onClick={onAddToFavorites}>Add to my favorites</li>
                <li>Rename</li>
                <li>Duplicate</li>
                <li onClick={onDeleteView}>Delete</li>
                <li >Set as board default</li>
            </ul>
        </div>
    )



}