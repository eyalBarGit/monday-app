import tableService from '../../service/tableService'

export function addNewCard(currTable, card) {
    return async dispatch => {
        try {
            const data = {
                currTable,
                card
            }
            dispatch(_addNewCard(data));
        }
        catch (err) {
            throw err
        }
    }
}

export function createNewTable(tableName) {
    return async dispatch => {
        try {
            const newTable = await tableService.createTable(tableName)
            dispatch(_createTable(newTable))
            return newTable
        }
        catch (err) {
            throw err
        }
    }
}

export function deleteCard(currTable, cardId) {
    return async dispatch => {
        try {
            // const updatedData = await cardService.deleteCard(currBoard, currTable, cardId)
            const data = {
                currTable,
                cardId
            }
            dispatch(_deleteCard(data));
        }
        catch (err) {
            throw err
        }
    }
}

export function deleteTable(currBoard, currTable) {
    return async dispatch => {
        try {
            // const updatedData = await tableService.deleteTable(currBoard, currTable)
            const data = {
                currTable: currTable,
                // newTables: updatedData.newTables,
                // newTableOrder: updatedData.newTableOrder,
                // newBoardCards: updatedData.newBoardCards
            }
            dispatch(_deleteTable(data));
        }
        catch (err) {
            throw err
        }
    }
}

export function dragInsideTable(start, source, destination, draggableId, boardId) {
    return async dispatch => {
        try {
            const updatedTable = await tableService.updateTable(start, source, destination, draggableId)
            const data = {
                updatedTable: updatedTable,
                boardId: boardId
            }
            dispatch(_dragInsideTable(data));

        }
        catch (err) {
            throw err
        }
    }
}

export function dragOutsideTable(start, source, destination, draggableId, currBoard, finish) {
    return async dispatch => {
        try {
            const res = await tableService.dragOutsideTable(start, source, destination, draggableId, finish)
            const data = {
                newStartTable: res.newStartTable,
                newFinishTable: res.newFinishTable,
                currBoard: currBoard
            }
            dispatch(_dragOutsideTable(data));
            _getState(null)
        }
        catch (err) {
            throw err
        }
    }
}


export function dragTable(source, destination, draggableId, groupsOrder, boardid) {
    return async dispatch => {
        try {
            const newGroupsOrder = await tableService.dragTable(source, destination, draggableId, groupsOrder)
            console.log('newGroupsOrder:', newGroupsOrder);

            const data = {
                newGroupsOrder,
                boardid
            }
            dispatch(_dragTable(data));
        }
        catch (err) {
            console.log('error:', err)

            throw err
        }
    }
}

export function moveCard(currBoard, moveToTable, currCard, currTable) {
    return async dispatch => {
        try {
            const updatedData = {
                currBoard: currBoard,
                moveToTableID: moveToTable,
                currCard: currCard,
                currTable: currTable
            }
            dispatch(_moveCard(updatedData));
        }
        catch (err) {
            throw err
        }
    }
}

// export function moveTable(cards, tableToMove, moveToBoardId) {

//     return async dispatch => {
//         try {
//             const currTableCards = tableService.getTableCards(cards, tableToMove)
//             const data = {
//                 tableToMove: tableToMove,
//                 moveToBoardId: moveToBoardId,
//                 currTableCards: currTableCards
//             }
//             dispatch(_moveTable(data));
//         }
//         catch (err) {
//             throw err
//         }
//     }
// }

export function copyTable(currBoard, tableToCopy, cards) {

    return async dispatch => {
        try {
            const newTableCopy = await tableService.copyTable(currBoard, tableToCopy, cards)
            const data = {
                copiedTable: newTableCopy.copiedTable,
                // copiedCards: newTableCopy.copiedCards
            }
            dispatch(_copyTable(data));
            return newTableCopy
        }
        catch (err) {
            throw err
        }
    }
}


export function changeTableName(currBoard, currTable, tableTitle) {

    return async dispatch => {
        try {
            currTable.title = tableTitle
            const newTableTitle = currTable
            const data = {
                currBoard: currBoard,
                currTable: newTableTitle,
            }
            dispatch(_changeTableName(data));
        }
        catch (err) {
            throw err
        }
    }
}



function _dragTable(data) {
    return {
        type: 'UPDATE_TABLES_ORDER',
        data
    }
}

function _dragInsideTable(data) {
    return {
        type: 'UPDATE_TABLE',
        data
    }
}

function _dragOutsideTable(data) {
    return {
        type: 'UPDATE_TABLES',
        data
    }
}


function _deleteTable(data) {
    return {
        type: 'DELETE_LIST',
        data
    }
}

function _addNewCard(data) {
    return {
        type: 'ADD_NEW_CARD',
        data
    }
}
function _copyTable(data) {
    return {
        type: 'COPY_LIST',
        data
    }
}
// function _moveTable(data) {
//     return {
//         type: 'MOVE_LIST',
//         data
//     }
// }
function _changeTableName(data) {
    return {
        type: 'CHANGE_LIST_NANE',
        data
    }
}
function _getState(data) {
    return {
        type: 'GET_LIST_STATE',
        data
    }
}
function _createTable(data) {

    return {
        type: 'CREATE_LIST',
        data
    }
}
function _deleteCard(data) {
    return {
        type: 'DELETE_CARD',
        data
    }
}
function _moveCard(data) {
    return {
        type: 'MOVE_CARD',
        data
    }
}