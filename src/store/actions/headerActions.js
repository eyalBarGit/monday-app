import boardService from '../../service/boardService';

export function createList(currBoard, listTitle) {
    return async dispatch => {
        try {
            const newList = await boardService.createList(listTitle)
            const data = {
                newList: newList,
                currBoard: currBoard,
            }
            dispatch(_createList(data));
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



function _createList(data) {
    return {
        type: 'CREATE_LIST',
        data
    }
}
function _toggleBgSide() {
    return {
        type: 'TOGGLE_BG_SIDE',
    }
}