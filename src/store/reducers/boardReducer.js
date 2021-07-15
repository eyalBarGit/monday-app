import UTILS from '../../service/utils'
import boards from '../../data/boards'
var boardsFromStorage = UTILS.loadFromStorage('boards')
var initialState = {
    boards: boardsFromStorage || boards,
};

export default function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_STATE':
            return {
                state: action.state
            };

        case 'UPDATE_LISTS_ORDER':
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.data.currBoard.id]: {
                        ...state.boards[action.data.currBoard.id],
                        listOrder: [...action.data.newListOrder]
                    }
                }
            };


        case 'ADD_NEW_LIST_ID':
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.data.currBoard.id]: {
                        ...state.boards[action.data.currBoard.id],
                        listOrder: [...state.boards[action.data.currBoard.id].listOrder, action.data.listId.id]
                    }
                }
            };

        case 'ADD_COPIED_LIST_ID':
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.data.currBoard.id]: {
                        ...state.boards[action.data.currBoard.id],
                    }
                }
            };



        case 'REMOVE_LIST_ID':
            var listOrder = state.boards[action.data.currBoard.id].listOrder
            var currIdx = listOrder.findIndex((listId) => { return listId === action.data.listId })
            listOrder.splice(currIdx, 1)

            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.data.currBoard.id]: {
                        ...state.boards[action.data.currBoard.id],

                    }
                }
            };

        case 'CREATE_BOARD':
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.data.newBoard.id]: {
                        ...action.data.newBoard,
                    },
                },
            };
        case 'DELETE_BOARD':
            const newBoards = state.boards
            delete newBoards[action.data.id]
            return {
                ...state,
                boards: {
                    ...newBoards,
                },
            };
        case 'CHANGE_BOARD_NAME':
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.data.currBoard.id]: {
                        ...action.data.currBoard,
                        name: action.data.boardName
                    },
                },
            };



        case 'MOVE_LIST':
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.data.moveToBoardId]: {
                        ...state.boards[action.data.moveToBoardId],
                        cards: {
                            ...state.boards[action.data.moveToBoardId].cards,
                            ...action.data.currListCards
                        },
                        lists: {
                            ...state.boards[action.data.moveToBoardId].lists,
                            [action.data.listToMove.id]: {
                                ...action.data.listToMove
                            }
                        },
                        listOrder: [...state.boards[action.data.moveToBoardId].listOrder, action.data.listToMove.id]
                    },

                },
            };

        case 'CHANGE_BOARD_BG':
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.data.currBoard.id]: {
                        ...state.boards[action.data.currBoard.id],
                        backgroundImg: action.data.bgName,
                    }
                }
            };
        case 'SET_ACTIVE_BOARD':
            return {
                ...state,
                activeBoard: action.activeBoard
            };


        case 'TOGGLE_CARD_DETAILS':
            return {
                ...state,
                isCardDetailShown: action.data
            };
        case 'TOGGLE_BG_SIDE':
            return {
                ...state,
                isBgSideOpen: !state.isBgSideOpen
            };
        case 'TOGGLE_FAV_BOARD':
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.savedBoard.id]: {
                        ...state.boards[action.savedBoard.id],
                        isFav: !state.boards[action.savedBoard.id].isFav
                    }
                },
                favBoards: [...state.favBoards, action.savedBoard.id]
            };

        case 'REMOVE_SAVED_BOARD':
            const index = state.favBoards.findIndex((boardId) => boardId === action.boardToRemove.id)
            state.favBoards.splice(index, 1)
            const newFavBoards = state.favBoards
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.boardToRemove.id]: {
                        ...state.boards[action.boardToRemove.id],
                        isFav: !state.boards[action.boardToRemove.id].isFav
                    }
                },
                favBoards: newFavBoards
            }


        case 'ADD_VIEW':
            // console.log('action.data:', action.data)
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.data.boardid]: {
                        ...state.boards[action.data.boardid],
                        views: [...state.boards[action.data.boardid].views, action.data.view]
                    }
                }
            };
        case 'REMOVE_VIEW':
            // console.log('action.', action)
            var viewList = state.boards[action.data.boardid].views
            var currViewIdx = viewList.findIndex((view) => { return view.id === action.data.viewId })
            viewList.splice(currViewIdx, 1)
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.data.boardid]: {
                        ...state.boards[action.data.boardid],
                        views: [...viewList]
                    }
                }
            };
        case 'SET_VIEW':
            return {
                ...state,
                boards: {
                    ...state.boards,
                    [action.data.boardid]: {
                        ...state.boards[action.data.boardid],
                        currView: action.data.view
                    }
                },
            };

        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            };

        case 'DISABLE_STORAGE_RESET':
            return {
                ...state,
                isStorageReset: false
            };
        case 'TOGGLE_STORAGE_RESET':
            return {
                ...state,
                isStorageReset: !state.isStorageReset
            };

        default:
            return state;
    }
}