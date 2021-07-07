import service from '../../service/boardService'
import listService from '../../service/listService'


export function addNewListId(listId, currBoard) {
    return async dispatch => {
        try {
            const data = { listId, currBoard }
            dispatch(_addNewListId(data));
        }
        catch (err) {
            throw err
        }
    }
}

export function addCopiedListId(listId, currBoard) {
    return async dispatch => {
        try {
            const data = { listId, currBoard }
            dispatch(_addCopiedListId(data));
        }
        catch (err) {
            throw err
        }
    }
}



export function removeListId(currBoard, listId) {
    return async dispatch => {
        try {
            const data = { currBoard, listId }
            dispatch(_removeListIdListId(data));

        }
        catch (err) {
            throw err
        }
    }
}

export function moveList(moveFromBoard, listToMove, moveToBoardId) {
    return async dispatch => {
        try {
            const data = {
                moveFromBoard,
                listToMove,
                moveToBoardId
            }
            dispatch(_moveList(data));
        }
        catch (err) {
            throw err
        }
    }
}

export function dragList(source, destination, draggableId, currBoard) {
    return async dispatch => {
        try {
            const newListOrder = await listService.dragList(source, destination, draggableId, currBoard)
            const data = {
                newListOrder: newListOrder,
                currBoard: currBoard
            }
            dispatch(_dragList(data));
        }
        catch (err) {
            throw err
        }
    }
}

export function createList(currBoard, listName) {
    return async dispatch => {
        try {
            const newList = await service.createList(listName)
            const data = {
                newList: newList,
                currBoard: currBoard
            }
            dispatch(_createList(data))

        }
        catch (err) {
            throw err
        }
    }
}



export function createBoard(boardName = "New Board") {
    return async dispatch => {
        try {
            const newBoard = await service.createBoard(boardName)
            const data = {
                newBoard: newBoard,
            }
            dispatch(_createBoard(data))
        }
        catch (err) {
            throw err
        }
    }
}
export function deleteBoard(boardToDelete) {
    return async dispatch => {
        try {

            dispatch(_deleteBoard(boardToDelete))
        }
        catch (err) {
            throw err
        }
    }
}

export function changeBoardName(currBoard, boardName) {
    return async dispatch => {
        try {
            const data = {
                currBoard: currBoard,
                boardName: boardName
            }
            dispatch(_changeBoardName(data))
        }
        catch (err) {
            throw err
        }
    }
}

export function favoriteBoard(currBoard) {
    return async dispatch => {
        try {
            dispatch(_favoriteBoard(currBoard))
        }
        catch (err) {
            throw err
        }
    }
}

export function removeSavedBoard(currBoard) {
    return async dispatch => {
        try {
            dispatch(_removeSavedBoard(currBoard))
        }
        catch (err) {
            throw err
        }
    }
}

export function changeBoardBackground(currBoard, bgName) {
    console.log('in background')
    return async dispatch => {
        try {
            const data = {
                bgName: bgName,
                currBoard: currBoard
            }
            dispatch(_changeBoardBg(data))

        }
        catch (err) {
            throw err
        }
    }
}

export function toggleBgSide() {
    return async dispatch => {
        try {
            dispatch(_toggleBgSide());

        }
        catch (err) {
            throw err
        }
    }
}

export function setActiveBoard(boardId) {
    return async dispatch => {
        try {
            dispatch(_setActiveBoard(boardId))

        }
        catch (err) {
            throw err
        }
    }
}



export function saveToStorage(key, value) {
    return async dispatch => {
        try {
            await service.saveToStorage(key, value)

        }
        catch (err) {
            throw err
        }
    }
}
export function disableStorageReset() {
    return async dispatch => {
        try {

            dispatch(_disableStorageReset())

        }
        catch (err) {
            throw err
        }
    }
}
export function toggleStorageReset() {
    return async dispatch => {
        try {

            dispatch(_toggleStorageReset())

        }
        catch (err) {
            throw err
        }
    }
}



export function addView(viewType) {
    return async dispatch => {
        try {
            dispatch(_addView(viewType));
        }
        catch (err) {
            throw err
        }
    }
}








function _addView(viewType) {
    return {
        type: 'ADD_VIEW',
        data: viewType
    }
}
function _disableStorageReset() {
    return {
        type: 'DISABLE_STORAGE_RESET',
    }
}
function _toggleStorageReset() {
    console.log('in toggle')
    return {
        type: 'TOGGLE_STORAGE_RESET',
    }
}



function _setActiveBoard(activeBoard) {
    return {
        type: 'SET_ACTIVE_BOARD',
        activeBoard
    }
}

function _dragList(data) {
    return {
        type: 'UPDATE_LISTS_ORDER',
        data
    }
}
function _createList(data) {

    return {
        type: 'CREATE_LIST',
        data
    }
}
function _changeBoardBg(data) {
    return {
        type: 'CHANGE_BOARD_BG',
        data
    }
}

function _toggleBgSide() {
    return {
        type: 'TOGGLE_BG_SIDE',
    }
}
function _favoriteBoard(savedBoard) {
    return {
        type: 'TOGGLE_FAV_BOARD',
        savedBoard
    }
}
function _removeSavedBoard(boardToRemove) {
    return {
        type: 'REMOVE_SAVED_BOARD',
        boardToRemove
    }
}
function _createBoard(data) {
    return {
        type: 'CREATE_BOARD',
        data
    }
}
function _changeBoardName(data) {
    return {
        type: 'CHANGE_BOARD_NAME',
        data
    }
}
function _deleteBoard(data) {
    return {
        type: 'DELETE_BOARD',
        data
    }
}
function _addNewListId(data) {
    return {
        type: 'ADD_NEW_LIST_ID',
        data
    }
}
function _addCopiedListId(data) {
    return {
        type: 'ADD_COPIED_LIST_ID',
        data
    }
}

function _removeListIdListId(data) {
    return {
        type: 'REMOVE_LIST_ID',
        data
    }
}
function _moveList(data) {
    return {
        type: 'MOVE_LIST',
        data
    }
}