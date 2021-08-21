import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { List } from '../../List/List'
import { dragList, toggleBgSide, } from '../../../store/actions/boardActions'
import { dragInsideList, dragOutsideList, } from '../../../store/actions/listActions'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { CardDetails } from '../../CardDetails/CardDetails'
import { BlackScreen } from '../../CardDetails/BlackScreen/BlackScreen'
// import { AddList } from '../AddList/AddList'
// import { useParams } from 'react-router';

export function Kanban({ boardid }) {
    // const { boardid } = useParams();
    const boards = useSelector(boards => boards.boardReducer)
    const listsState = useSelector(state => state.listReducer.lists)
    const listOrder = useSelector(boards => boards.boardReducer.boards[boardid].listOrder)

    const { isCardDetailShown, isBgSideOpen } = boards
    // const [isAddListVisible, setAddList] = useState(false)
    const [currBoard, setCurrBoard] = useState(boards.boards[boardid])
    const dispatch = useDispatch()
    const boardRef = useRef(null)


    // useEffect(() => { dispatch(saveToStorage('boards', boards)) }, [boards, dispatch])
    // useEffect(() => { dispatch(saveToStorage('lists', listsState)) }, [listsState, dispatch])


    const loadCurrBoard = useCallback(() => {
        let currentBoard = boards.boards[boardid]
        setCurrBoard(currentBoard)
    }, [boardid, boards.boards])


    useEffect(() => {
        loadCurrBoard()
    }, [listOrder, loadCurrBoard])



    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) { return }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return

        const start = listsState[source.droppableId]
        const finish = listsState[destination.droppableId]

        if (start === finish && type !== 'list') {
            dispatch(dragInsideList(start, source, destination, draggableId))
            return
        }
        if (type === 'list') {
            dispatch(dragList(source, destination, draggableId, currBoard))
            return
        }
        dispatch(dragOutsideList(start, source, destination, draggableId, currBoard, finish))

    }


    const toggleBgBoard = () => {
        dispatch(toggleBgSide())
    }

    // const onToggleAddList = () => {
    //     setAddList(!isAddListVisible)
    // }




    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={ondragstart}
        >
            <Droppable
                droppableId="all-lists"
                direction="horizontal"
                type="list"
                className="droppable-board"
            >
                {(provided) => {
                    return (
                        <div ref={boardRef} className="kanban flex column ">
                            <MainDndArea
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <div className="main-content flex ">
                                  
                                    {currBoard.listOrder.map((listId, idx) => {
                                        return <div key={listId} className="list-section">
                                            <List index={idx}
                                                currBoard={currBoard}
                                                listId={listId}></List>
                                        </div>
                                    })}
                                    {/* {!isAddListVisible &&
                                        <button onClick={onToggleAddList} className="add-list-btn">Add list</button>
                                    } */}
                                    {/* {isAddListVisible &&
                                        <AddList currBoard={currBoard} onToggleAddList={onToggleAddList} />
                                    } */}
                                </div>
                                {isBgSideOpen &&
                                    <span onClick={toggleBgBoard} >
                                        <BlackScreen />
                                    </span>
                                }
                                {provided.placeholder}

                            </MainDndArea>
                            {isCardDetailShown &&
                                <CardDetails currBoard={currBoard} />
                            }
                        </div>
                    )
                }}
            </Droppable>
        </DragDropContext >
    )
}



const MainDndArea = styled.div`
    width: 100 %;
    `;

