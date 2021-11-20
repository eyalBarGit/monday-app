import UTILS from '../../service/utils'
import tables from '../../data/tables.json'

var initialState = {
    tables: UTILS.loadFromStorage('tables') || tables
};


export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_TABLE':
            return {
                ...state,
                tables: {
                    ...state.tables,
                    [action.data.boardId]: {
                        ...state.tables[action.data.boardId],
                        groups: {
                            ...state.tables[action.data.boardId].groups,
                            [action.data.updatedTable.id]: action.data.updatedTable
                        }
                    },
                }
            };
        case 'UPDATE_TABLES':
            return {
                ...state,
                tables: {
                    ...state.tables,
                    [action.data.currBoard.id]: {
                        ...state.tables[action.data.currBoard.id],
                        groups: {
                            ...state.tables[action.data.currBoard.id].groups,
                            [action.data.newStartTable.id]: action.data.newStartTable,
                            [action.data.newFinishTable.id]: action.data.newFinishTable,
                        }
                    }
                }
            };
        case 'UPDATE_TABLES_ORDER':
            // console.log('action:', action.data)
            return {
                ...state,
                tables: {
                    ...state.tables,
                    [action.data.boardid]: {
                        ...state.tables[action.data.boardid],
                        groupsOrder: action.data.newGroupsOrder
                    }
                }
            };

        // case 'CREATE_TABLE':
        //     return {
        //         ...state,
        //         tables: {
        //             ...state.tables,
        //             [action.data.id]: action.data
        //         }
        //     };
        // case 'ADD_NEW_CARD':
        //     console.log('action:', action)
        //     return {
        //         ...state,
        //         tables: {
        //             ...state.tables,
        //             [action.data.currTable.id]: {
        //                 ...state.tables[action.data.currTable.id],
        //                 cardIds: [
        //                     ...state.tables[action.data.currTable.id].cardIds, action.data.card.id
        //                 ]
        //             }
        //         }
        //     };

        // case 'DELETE_TABLE':
        //     console.log('action.data:', action.data)
        //     var newTables = state.tables
        //     delete newTables[action.data.currTable.id]
        //     return {
        //         ...state,
        //         tables: {
        //             ...newTables
        //         },
        //     };
        // case 'COPY_TABLE':
        //     console.log('action.data(TABLE-REDUCER):', action.data)
        //     return {
        //         ...state,
        //         tables: {
        //             ...state.tables,
        //             [action.data.copiedTable.id]: {
        //                 ...action.data.copiedTable
        //             }
        //         },
        //     };

        // case 'GET_TABLE_STATE':
        //     return {
        //         ...state,
        //     };
        // case 'CHANGE_TABLE_NANE':
        //     return {
        //         ...state,
        //         tables: {
        //             ...state.tables,
        //             [action.data.currTable.id]: {
        //                 ...action.data.currTable
        //             }
        //         },
        //     };



        // case 'DELETE_CARD':
        //     var idx = state.lists[action.data.currTable.id].cardIds.findIndex((cardId) => cardId === action.data.cardId)
        //     var newTableOrder = state.lists[action.data.currTable.id].cardIds
        //     newTableOrder.splice(idx, 1)
        //     return {
        //         ...state,
        //         lists: {
        //             ...state.lists,
        //             [action.data.currTable.id]: { ...state.lists[action.data.currTable.id], cardIds: [...newTableOrder] }
        //         },

        //     }
        // case 'MOVE_CARD':
        //     return {
        //         ...state,
        //         lists: {
        //             ...state.lists,
        //             [action.data.currTable.id]: {
        //                 ...state.lists[action.data.currTable.id],
        //                 cardIds: state.lists[action.data.currTable.id].cardIds.filter(cardId => cardId !== action.data.currCard.id)
        //             },
        //             [action.data.moveToTableID]: {
        //                 ...state.lists[action.data.moveToTableID],
        //                 cardIds: [...state.lists[action.data.moveToTableID].cardIds, action.data.currCard.id]
        //             }
        //         },
        //     };


        default:
            return state;
    }
}