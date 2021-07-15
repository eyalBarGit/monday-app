import React, { useCallback, useEffect, useState } from 'react';
import { CardList } from '../CardList/CardList'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { AddCard } from '../AddCard/AddCard'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { ChangeListTitle } from '../ChangeListTitle/ChangeListTitle'
import { MoveList } from '../ListMenu/MoveList/MoveList'
import {  useSelector } from 'react-redux';




export function List({ listId, currBoard, index, }) {
    const [isAddCardShown, setAddCard] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isMoveListVisible, setMoveList] = useState(false)
    const [currList, setCurrList] = useState(null)

    const listsState = useSelector(state => state.listReducer.lists)
    const cardsState = useSelector(state => state.cardReducer.cards)

    const plus = <FontAwesomeIcon icon={faPlus} />



    const loadCurrList = useCallback(() => {
        const currList = listsState[listId]
        setCurrList(currList)
    }, [listsState, listId])


    useEffect(() => {
        loadCurrList()
    }, [cardsState, listsState, loadCurrList])




    const onToggleAddCard = () => {
        setAddCard(!isAddCardShown)
    }

    const toggleEditTitle = () => {
        setIsEditTitle(!isEditTitle)
    }

    const onToggleMoveList = () => {
        setMoveList(!isMoveListVisible)
    }




    if (!currList) return 'loading list...'
    return (
        <Draggable
            draggableId={currList.id}
            index={index}
            bgColor={currList.bgColor}

        >
            {(provided) => (
                <MainDragContainer
                    {...provided.draggableProps}
                    ref={provided.innerRef}

                >
                    <div className="list flex column align-center" style={{ backgroundColor: currList.bgColor }}>
                        {isMoveListVisible &&
                            <MoveList currBoard={currBoard} currList={currList} onToggleMoveList={onToggleMoveList} />
                        }
                        <div className="title-container align-center flex">
                            <span className="drag-handle flex space-between "
                                {...provided.dragHandleProps}
                            >
                                {!isEditTitle && <div className="list-title" >
                                    <p >{currList.title} / {currList.cardIds.length}</p>
                                </div>
                                }
                                {isEditTitle && <span className="edit-title">
                                    <ChangeListTitle
                                        toggleEditTitle={toggleEditTitle}
                                        currBoard={currBoard}
                                        currList={currList}
                                    />
                                </span>
                                }

                            </span>
                        </div>

                        <div className="main-container margin-center">
                            <Droppable droppableId={listId} type="card">
                                {(provided, snapshot) => {
                                    return (
                                        <div>
                                            <MainDropContainer
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                bgColor={currList.bgColor}


                                            >
                                                <CardList
                                                    cardIds={currList.cardIds}
                                                    provided={provided}
                                                    currListID={currList.id}
                                                />
                                            </MainDropContainer>
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                        <section className="add-deal-section flex align-center ">
                            {!isAddCardShown && <div onClick={onToggleAddCard}
                                className="add-deal-text flex align-center">
                                <div className="plus-sign">{plus}</div>
                                <p>Add Deal</p>
                            </div>
                            }
                            {isAddCardShown && <div className="add-card-section">
                                <AddCard toggleAddCard={onToggleAddCard}
                                    currList={currList}
                                />
                            </div>
                            }
                            <div className="div">

                            </div>

                        </section>


                    </div>
                </MainDragContainer>
            )
            }
        </Draggable >
    )
}
const MainDropContainer = styled.div`

width:100%;
min-height:100px;
`;
const MainDragContainer = styled.div`

`;

