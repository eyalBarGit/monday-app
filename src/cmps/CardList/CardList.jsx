import React from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { toggleCardDetails, updateCurrList } from '../../store/actions/cardActions'
import { CardPreview } from '../CardPreview/CardPreview';


export function CardList({ provided, cardIds, currListID }) {
    const { boardid } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const onToggleCardDetails = (cardid) => {
        history.push(`/main/boards/${boardid}/${currListID}/${cardid}`)
        dispatch(updateCurrList(currListID.id))
        dispatch(toggleCardDetails(true))
    }


    return (
        <div className="card-list">
            {cardIds.map((cardid, idx) => {
                return <div key={cardid} onClick={() => onToggleCardDetails(cardid)}>
                    <CardPreview
                        key={cardid}
                        index={idx}
                        cardid={cardid} />

                </div>
            })}
            {provided.placeholder}
        </div>

    )
}

