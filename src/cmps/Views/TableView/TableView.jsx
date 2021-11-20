import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { dragInsideTable, dragOutsideTable, } from '../../../store/actions/tableActions'
import { dragTable } from '../../../store/actions/tableActions'
import styled from 'styled-components'
import PropTypes from 'prop-types'; // ES6
import { TableGroup } from './TableGroup/TableGroup';

export function TableView({ boardid }) {
    const boards = useSelector(state => state.boardReducer.boards)
    const tables = useSelector(state => state.tableReducer.tables)
    // const listOrder = useSelector(boards => boards.boardReducer.boards[boardid].listOrder)

    const [currTable] = useState(tables[boardid])
    const dispatch = useDispatch()
    const tableRef = useRef(null)


    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) { return }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return
        const start = tables[boardid].groups[source.droppableId]
        const finish = tables[boardid].groups[destination.droppableId]

        if (start?.id === finish?.id && type !== 'table') {
            dispatch(dragInsideTable(start, source, destination, draggableId, boardid))
            return
        }
        if (type === 'table') {
            dispatch(dragTable(source, destination, draggableId, currTable, boardid))
            return
        }
        dispatch(dragOutsideTable(start, source, destination, draggableId, boards[boardid], finish))

    }

    // const loadCurrTable = useCallback(() => {
    //     let currTable = tables[boardid]
    //     setCurrBoard(currTable)
    // }, [boardid, tables])


    // useEffect(() => {
    //     loadCurrTable()
    //     console.log('render')
    // }, [ loadCurrTable, currTable])




    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={ondragstart}
        >
            <Droppable
                droppableId="all-tables"
                direction="vertical"
                type="table"
                className="droppable-table-view"
            >
                {(provided) => {
                    return (
                        <div ref={tableRef} className="table-view">
                            <MainDndArea
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >

                                <h2>Table</h2>
                                <div >
                                    {currTable.groupsOrder.map((groupId, idx) => <TableGroup boardid={boardid} key={idx} idx={idx} groupId={groupId} />)}
                                </div>
                                {provided.placeholder}

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

TableView.propTypes = {
    boardid: PropTypes.string.isRequired
}