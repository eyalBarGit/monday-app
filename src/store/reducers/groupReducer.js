import UTILS from '../../service/utils'
import groups from '../../data/groups.json'

var initialState = {
    lists: UTILS.loadFromStorage('groups') || groups
};


export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_LIST':
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [action.data.updatedList.id]: action.data.updatedList
                }
            };
        case 'UPDATE_LISTS':
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [action.data.newStartList.id]: action.data.newStartList,
                    [action.data.newFinishList.id]: action.data.newFinishList,
                }
            };

        case 'CREATE_LIST':
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [action.data.id]: action.data
                }
            };
        case 'ADD_NEW_CARD':
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [action.data.currList.id]: {
                        ...state.lists[action.data.currList.id],
                        cardIds: [
                            ...state.lists[action.data.currList.id].cardIds, action.data.card.id
                        ]
                    }
                }
            };

        case 'DELETE_LIST':
            console.log('action.data:', action.data)
            var newLists = state.lists
            delete newLists[action.data.currList.id]
            return {
                ...state,
                lists: {
                    ...newLists
                },
            };
         case 'COPY_LIST':
            console.log('action.data(LIST-REDUCER):', action.data)
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [action.data.copiedList.id]: {
                        ...action.data.copiedList
                    }
                },
            };

        case 'GET_LIST_STATE':
            return {
                ...state,
            };
        case 'CHANGE_LIST_NANE':
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [action.data.currList.id]: {
                        ...action.data.currList
                    }
                },
            };



        case 'DELETE_CARD':
            var idx = state.lists[action.data.currList.id].cardIds.findIndex((cardId) => cardId === action.data.cardId)
            var newListOrder = state.lists[action.data.currList.id].cardIds
            newListOrder.splice(idx, 1)
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [action.data.currList.id]: { ...state.lists[action.data.currList.id], cardIds: [...newListOrder] }
                },

            }
        case 'MOVE_CARD':
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [action.data.currList.id]: {
                        ...state.lists[action.data.currList.id],
                        cardIds: state.lists[action.data.currList.id].cardIds.filter(cardId => cardId !== action.data.currCard.id)
                    },
                    [action.data.moveToListID]: {
                        ...state.lists[action.data.moveToListID],
                        cardIds: [...state.lists[action.data.moveToListID].cardIds, action.data.currCard.id]
                    }
                },
            };


        default:
            return state;
    }
}