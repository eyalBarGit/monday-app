import React, { useCallback, useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { saveToStorage } from '../../../../../store/actions/boardActions';


export function TableRow({ cardid, index }) {
    const cardsState = useSelector(state => state.cardReducer.cards)
    const dispatch = useDispatch()
    const [currCard, setCurrCard] = useState(null)


    useEffect(() => { dispatch(saveToStorage('cards', cardsState)) }, [cardsState, dispatch])

    const loadCurrCard = useCallback(() => {
        const currCard = cardsState[cardid]
        setCurrCard(currCard)
    }, [cardsState, cardid])

    useEffect(() => {
        loadCurrCard()
    }, [loadCurrCard])




    if (!currCard) return 'loading...'
    return (
        <Draggable draggableId={currCard?.id} index={index}>
            {(provided, snapshot) => (
                <div>
                    <MainContainer
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <div className="table-row margin-center flex align-center">
                            <p className="row-title">{currCard?.title}</p>
                            <p className="row-owner">{currCard?.owner}</p>

                            <div className="right-side"></div>

                        </div>
                    </MainContainer>
                </div>
            )
            }
        </Draggable >
    )
}

const MainContainer = styled.div`

width:100%;
`;