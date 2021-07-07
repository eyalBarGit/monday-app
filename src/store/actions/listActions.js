import listService from '../../service/listService'

export function addNewCard(currList, card) {
    return async dispatch => {
        try {
            const data = {
                currList,
                card
            }
            dispatch(_addNewCard(data));
        }
        catch (err) {
            throw err
        }
    }
}

export function createNewList(listName) {
    return async dispatch => {
        try {
            const newList = await listService.createList(listName)
            dispatch(_createList(newList))
            return newList
        }
        catch (err) {
            throw err
        }
    }
}

export function deleteCard(currList, cardId) {
    return async dispatch => {
        try {
            // const updatedData = await cardService.deleteCard(currBoard, currList, cardId)
            const data = {
                currList,
                cardId
            }
            dispatch(_deleteCard(data));
        }
        catch (err) {
            throw err
        }
    }
}

export function deleteList(currBoard, currList) {
    return async dispatch => {
        try {
            // const updatedData = await listService.deleteList(currBoard, currList)
            const data = {
                currList: currList,
                // newLists: updatedData.newLists,
                // newListOrder: updatedData.newListOrder,
                // newBoardCards: updatedData.newBoardCards
            }
            dispatch(_deleteList(data));
        }
        catch (err) {
            throw err
        }
    }
}

export function dragInsideList(start, source, destination, draggableId,) {
    return async dispatch => {
        try {
            const updatedList = await listService.updateList(start, source, destination, draggableId)
            const data = {
                updatedList: updatedList,
            }
            dispatch(_dragInsideList(data));

        }
        catch (err) {
            throw err
        }
    }
}

export function dragOutsideList(start, source, destination, draggableId, currBoard, finish) {
    return async dispatch => {
        try {
            const res = await listService.dragOutsideList(start, source, destination, draggableId, finish)
            const data = {
                newStartList: res.newStartList,
                newFinishList: res.newFinishList,
                currBoard: currBoard
            }
            dispatch(_dragOutsideList(data));
            _getState(null)
        }
        catch (err) {
            throw err
        }
    }
}

export function moveCard(currBoard, moveToList, currCard, currList) {
    return async dispatch => {
        try {
            const updatedData = {
                currBoard: currBoard,
                moveToListID: moveToList,
                currCard: currCard,
                currList: currList
            }
            dispatch(_moveCard(updatedData));
        }
        catch (err) {
            throw err
        }
    }
}

// export function moveList(cards, listToMove, moveToBoardId) {

//     return async dispatch => {
//         try {
//             const currListCards = listService.getListCards(cards, listToMove)
//             const data = {
//                 listToMove: listToMove,
//                 moveToBoardId: moveToBoardId,
//                 currListCards: currListCards
//             }
//             dispatch(_moveList(data));
//         }
//         catch (err) {
//             throw err
//         }
//     }
// }

export function copyList(currBoard, listToCopy,cards) {

    return async dispatch => {
        try {
            const newListCopy = await listService.copyList(currBoard, listToCopy,cards)
            const data = {
                copiedList: newListCopy.copiedList,
                // copiedCards: newListCopy.copiedCards
            }
            dispatch(_copyList(data));
            return newListCopy
        }
        catch (err) {
            throw err
        }
    }
}


export function changeListName(currBoard, currList, listTitle) {

    return async dispatch => {
        try {
            currList.title = listTitle
            const newListTitle = currList
            const data = {
                currBoard: currBoard,
                currList: newListTitle,
            }
            dispatch(_changeListName(data));
        }
        catch (err) {
            throw err
        }
    }
}





function _dragInsideList(data) {
    return {
        type: 'UPDATE_LIST',
        data
    }
}

function _dragOutsideList(data) {
    return {
        type: 'UPDATE_LISTS',
        data
    }
}


function _deleteList(data) {
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
function _copyList(data) {
    return {
        type: 'COPY_LIST',
        data
    }
}
// function _moveList(data) {
//     return {
//         type: 'MOVE_LIST',
//         data
//     }
// }
function _changeListName(data) {
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
function _createList(data) {

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