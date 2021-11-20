import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'; // ES6
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { TableRow } from './TableRow/TableRow';

export function TableGroup({ groupId, idx, boardid }) {
    const tables = useSelector(state => state.tableReducer.tables)
    const [currGroup, setCurrGroup] = useState()

    const onSetCurrGroup = useCallback(
        () => {
            setCurrGroup(tables[boardid].groups[groupId])
        },
        [groupId, tables, boardid],
    )

    useEffect(() => {
        onSetCurrGroup()
        console.log('currGroup:', currGroup);
    }, [onSetCurrGroup, currGroup, tables])

    if (!currGroup) return 'loading group...'
    return (
        <Draggable
            draggableId={currGroup.id}
            index={idx}
            bgColor={currGroup.bgColor}

        >
            {(provided) => (
                <MainDragContainer
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}

                >
                    <Droppable droppableId={groupId} type="table-item">
                        {(provided, snapshot) => {
                            return (
                                <div>
                                    <MainDropContainer
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        bgColor={currGroup?.bgColor}
                                    >
                                        <div className="table-group">
                                            <div>{currGroup.name}</div>
                                            {currGroup.cardsIdsOrder.map((cardId, idx) => <TableRow key={cardId}
                                                index={idx}
                                                cardid={cardId} />)}
                                            {provided.placeholder}
                                        </div>
                                    </MainDropContainer>
                                </div>

                            )
                        }}

                    </Droppable>
                </MainDragContainer>
            )

            }

        </Draggable>
    )



}

TableGroup.propTypes = {
    groupId: PropTypes.string.isRequired,
    boardid: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,

}
const MainDropContainer = styled.div`

width:100%;
min-height:100px;
`;
const MainDragContainer = styled.div`

`;

