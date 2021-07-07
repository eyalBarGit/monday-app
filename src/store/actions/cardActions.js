import cardService from '../../service/cardService';

export function toggleCardDetails(isCardDetailShown) {
    return async dispatch => {
        try {
            dispatch(_toggleCardDetails(isCardDetailShown));

        }
        catch (err) {
            throw err
        }
    }
}
export function updateCurrList(listId) {
    return async dispatch => {
        try {
            dispatch(_updateCurrList(listId));

        }
        catch (err) {
            throw err
        }
    }
}


export function createCard(cardTitle) {
    return async dispatch => {
        try {
            const newCard = await cardService.createCard(cardTitle)
            const data = {
                newCard: newCard,
            }
            dispatch(_createCard(data));
            return newCard
        }
        catch (err) {
            throw err
        }
    }
}
export function addCopiedCards(cardObject) {
    return async dispatch => {
        try {
            dispatch(_addCopiedCards(cardObject));
        }
        catch (err) {
            throw err
        }
    }
}



export function changeCardTitle(currCard, cardTitle, currBoard) {
    return async dispatch => {
        const data = {
            currCard: currCard,
            cardTitle: cardTitle,
            currBoard: currBoard
        }
        try {
            dispatch(_changeCardTitle(data));
            dispatch(_getState('eyal is data'))
        }
        catch (err) {
            throw err
        }
    }
}


// export function deleteCard(currBoard, currList, cardId) {
//     return async dispatch => {
//         try {
//             const updatedData = await cardService.deleteCard(currBoard, currList, cardId)

//             dispatch(_deleteCard(updatedData));
//         }
//         catch (err) {
//             throw err
//         }
//     }
// }
export function copyCard(currBoard, copyToList, cardToCopy) {
    return async dispatch => {
        try {
            const copiedCard = await cardService.copyCard(cardToCopy)
            const updatedData = {
                copiedCard: copiedCard,
                currBoard: currBoard,
                copyToListID: copyToList
            }
            dispatch(_copyCard(updatedData));
            return copiedCard
        }
        catch (err) {
            throw err
        }
    }
}

export function setCardDesc(currCard, desc) {
    return async dispatch => {
        try {
            const data = {
                // currBoard: currBoard,
                currCard: currCard,
                desc: desc,
            }
            dispatch(_setCardDesc(data));

        }
        catch (err) {
            throw err
        }
    }
}
export function checkItem(currBoard, currCard, currCheckList, currItem, isChecked) {
    return async dispatch => {
        try {
            const data = {
                currBoard: currBoard,
                currCard: currCard,
                currCheckList: currCheckList,
                currItem: currItem,
                isChecked: isChecked
            }
            dispatch(_toggleCheckItem(data));
        }
        catch (err) {
            throw err
        }
    }
}
export function setLabel(currBoard, currCard, labelColor) {
    const data = {
        currBoard: currBoard,
        currCard: currCard,
        labelColor: labelColor
    }
    return async dispatch => {
        try {
            dispatch(_setLabel(data));
        }
        catch (err) {
            throw err
        }
    }
}
export function removeLabel(currBoard, currCard, labelIndex) {
    const newLabelList = cardService.removeLabel(currCard, labelIndex)
    const data = {
        currBoard: currBoard,
        currCard: currCard,
        newLabelList: newLabelList
    }
    return async dispatch => {
        try {
            dispatch(_updateLabels(data));
        }
        catch (err) {
            throw err
        }
    }
}


export function toggleCardWatch(currBoard, currCard, isWatched) {
    return async dispatch => {
        try {
            const data = {
                currBoard: currBoard,
                currCard: currCard,
                isWatched: isWatched
            }
            dispatch(_toggleCardWatch(data));

        }
        catch (err) {
            throw err
        }
    }
}

export function createCheckList(currBoard, currCard, checklistName) {
    return async dispatch => {
        try {
            const newChecklist = await cardService.createCheckList(checklistName)
            const data = {
                currBoard: currBoard,
                currChecklist: newChecklist,
                currCard: currCard,
            }
            dispatch(_addChecklist(data));

        }
        catch (err) {
            throw err
        }
    }
}
export function removeCard(cardId) {
    return async dispatch => {
        try {
            const data = { cardId }
            dispatch(_removeCard(data));

        }
        catch (err) {
            throw err
        }
    }
}
export function addCheckListItem(currBoard, currCard, currCheckList, itemName) {
    return async dispatch => {
        try {
            const currItem = await cardService.createCheckListItem(itemName)
            const data = {
                currBoard: currBoard,
                currCard: currCard,
                currCheckList: currCheckList,
                newItem: currItem
            }
            dispatch(_addCheckListItem(data));

        }
        catch (err) {
            throw err
        }
    }
}
export function removeCheckListItem(currBoard, currCard, currCheckList, itemToRemove) {
    return async dispatch => {
        try {
            const data = {
                currBoard: currBoard,
                currCard: currCard,
                currCheckList: currCheckList,
                itemToRemove: itemToRemove
            }
            dispatch(_removeCheckListItem(data));

        }
        catch (err) {
            throw err
        }
    }
}
export function removeCheckList( currCard, checkListToRemove) {
    return async dispatch => {
        try {
            const data = {
               
                checkListToRemove: checkListToRemove,
                currCard: currCard,
            }
            dispatch(_removeCheckList(data));

        }
        catch (err) {
            throw err
        }
    }
}


export function setCardCover(currBoard, currCard, color) {
    return async dispatch => {
        try {
            const data = {
                currBoard: currBoard,
                currCard: currCard,
                color: color,
            }
            dispatch(_setCardCover(data));

        }
        catch (err) {
            throw err
        }
    }
}

export function setDueDate(currBoard, currCard, dueDate) {
    return async dispatch => {
        try {
            const data = {
                currBoard: currBoard,
                currCard: currCard,
                dueDate: dueDate,
            }
            dispatch(_setDueDate(data));

        }
        catch (err) {
            throw err
        }
    }
}





function _toggleCardDetails(data) {
    return {
        type: 'TOGGLE_CARD_DETAILS',
        data
    }
}
function _updateCurrList(data) {
    return {
        type: 'UPDATE_CURR_LIST',
        data
    }
}
// function _deleteCard(data) {
//     return {
//         type: 'DELETE_CARD',
//         data
//     }
// }
function _copyCard(data) {
    return {
        type: 'COPY_CARD',
        data
    }
}
function _changeCardTitle(data) {
    return {
        type: 'SET_CARD_TITLE',
        data
    }
}
// function _moveCard(data) {
//     return {
//         type: 'MOVE_CARD',
//         data
//     }
// }
function _setCardCover(data) {
    return {
        type: 'CARD_COVER',
        data
    }
}
function _setCardDesc(data) {
    return {
        type: 'SET_DESC',
        data
    }
}
function _addChecklist(data) {
    return {
        type: 'CREATE_CHECKLIST',
        data
    }
}
function _removeCheckList(data) {
    return {
        type: 'REMOVE_CHECKLIST',
        data
    }
}
function _addCheckListItem(data) {
    return {
        type: 'ADD_CHECKLIST_ITEM',
        data
    }
}
function _removeCheckListItem(data) {
    return {
        type: 'REMOVE_CHECKLIST_ITEM',
        data
    }
}
function _setDueDate(data) {
    return {
        type: 'SET_DUE_DATE',
        data
    }
}
function _toggleCardWatch(data) {
    return {
        type: 'TOGGLE_CARD_WATCH',
        data
    }
}
function _toggleCheckItem(data) {
    return {
        type: 'TOGGLE_CHECK_ITEM',
        data
    }
}
function _setLabel(data) {
    return {
        type: 'SET_LABEL',
        data
    }
}
function _updateLabels(data) {
    return {
        type: 'UPDATE_LABELS',
        data
    }
}
function _getState(data) {
    return {
        type: 'GET_CARDS_STATE',
        data
    }
}

function _createCard(data) {
    return {
        type: 'CREATE_CARD',
        data
    }
}
function _removeCard(data) {
    return {
        type: 'REMOVE_CARD',
        data
    }
}
function _addCopiedCards(data) {
    return {
        type: 'ADD_COPIED_CARDS',
        data
    }
}