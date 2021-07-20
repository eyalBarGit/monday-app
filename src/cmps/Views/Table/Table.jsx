import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { dragInsideList, dragOutsideList, } from '../../../store/actions/listActions'
import { dragList, } from '../../../store/actions/boardActions'
import styled from 'styled-components'
// import { TaskPreview } from '../../Table-DND/TableTaskPreview/TableTaskPreview';

export function Table({ boardid }) {
    const boards = useSelector(state => state.boardReducer.boards)
    const tables = useSelector(state => state.tableReducer.tables)
    // const listOrder = useSelector(boards => boards.boardReducer.boards[boardid].listOrder)
    const listsState = useSelector(state => state.listReducer.lists)

    const [currTable, setCurrTable] = useState(null)
    const [currBoard, setCurrBoard] = useState(boards[boardid])
    const dispatch = useDispatch()


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

    const loadCurrBoard = useCallback(() => {
        let currentBoard = boards[boardid]
        setCurrBoard(currentBoard)
    }, [boardid, boards])

    useEffect(() => {
        console.log('tables:', tables)
        loadCurrBoard()
        setCurrTable(tables[currBoard.tableId])

    }, [tables,currBoard.tableId,loadCurrBoard])


    return (
    <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={ondragstart}
        >
            <Droppable
                droppableId="all-lists"
                direction="vertical"
                type="list"
                className="droppable-board"
            >
                {(provided) => {
                    return (
                        <div className="table-view">
                            <MainDndArea
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <h2>Table</h2>
                                <div className="flex">
                                    {currTable && Object.keys(currTable.groups).map((column, idx) => <p key={idx}>_{column}</p>)}
                                </div>
                            </MainDndArea>
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