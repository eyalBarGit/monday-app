import React from 'react';
import { setCardCover } from '../../../store/actions/cardActions'

import { useDispatch } from 'react-redux';
import { ColorPallette } from '../../ColorPallette/ColorPallette'
export function CardCoverMenu({ onToggleColor, toggleCardVisibility, currCard, currBoard }) {

    const dispatch = useDispatch()

    const onCloseCover = () => {
        dispatch(setCardCover(currBoard, currCard, ''))
        toggleCardVisibility()
    }
    const onSelectCover = (color) => {
        if (color === 'noCover') return onCloseCover()
        dispatch(setCardCover(currBoard, currCard, color))
    }




    return (
        <div className="card-cover-menu">
            <div className="top-part flex space-between">
            </div>
            <ColorPallette
                onCloseColor={onCloseCover}
                onSelectColor={onSelectCover}
                currCard={currCard}
                currBoard={currBoard}
                onToggleColor={onToggleColor}
                toggleCardVisibility={toggleCardVisibility} />
        </div>
    )
}

