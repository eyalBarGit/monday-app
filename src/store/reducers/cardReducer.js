import UTILS from '../../service/utils'
import cards from '../../data/cards.json'
var initialState = { cards: UTILS.loadFromStorage('cards') || cards }

export default function cardReducer(state = initialState, action) {
    switch (action.type) {

        case 'CREATE_CARD':
            console.log('action:', action.data)
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.data.newCard.id]: action.data.newCard,
                },
            };

        case 'COPY_CARD':
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.data.copiedCard.id]: action.data.copiedCard
                },
            };
        case 'ADD_COPIED_CARDS':
            return {
                ...state,
                cards: {
                    ...state.cards, ...action.data
                },

            };
        case 'SET_CARD_TITLE':
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.data.currCard.id]: { ...action.data.currCard, title: action.data.cardTitle },
                },
            };
        // case 'MOVE_CARD':
        //     return {
        //         ...state,
        //         boards: {
        //             ...state.boards,
        //             [action.data.currBoard.id]: {
        //                 ...state.boards[action.data.currBoard.id],
        //                 lists: {
        //                     ...state.boards[action.data.currBoard.id].lists,
        //                     [action.data.currList.id]: {
        //                         ...state.boards[action.data.currBoard.id].lists[action.data.currList.id],
        //                         cardIds: state.boards[action.data.currBoard.id].lists[action.data.currList.id].cardIds.filter(cardId => cardId !== action.data.currCard.id)
        //                     },
        //                     [action.data.moveToListID]: {
        //                         ...state.boards[action.data.currBoard.id].lists[action.data.moveToListID],
        //                         cardIds: [...state.boards[action.data.currBoard.id].lists[action.data.moveToListID].cardIds, action.data.currCard.id]
        //                     }
        //                 },
        //             }
        //         }
        //     };
        case 'REMOVE_CARD':
            var newCards = state.cards
            delete newCards[action.data.cardId]
            return {
                ...state,
                cards: {
                    ...newCards,
                }
            };



        case 'SET_DESC':
            console.log('CARD:', action.data)
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.data.currCard.id]:
                    {
                        ...state.cards[action.data.currCard.id],
                        desc: action.data.desc
                    }
                },
            };

        case 'SET_LABEL':
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.data.currCard.id]:
                    {
                        ...state.cards[action.data.currCard.id],
                        labels: [...state.cards[action.data.currCard.id].labels, action.data.labelColor]
                    }
                },
            }

        case 'UPDATE_LABELS':
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.data.currCard.id]:
                    {
                        ...state.cards[action.data.currCard.id],
                        labels: action.data.newLabelList
                    }
                },
            };

        case 'TOGGLE_CARD_WATCH':
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.data.currCard.id]:
                    {
                        ...state.cards[action.data.currCard.id],
                        isWatched: action.data.isWatched
                    }
                },
            };

        case 'TOGGLE_CHECK_ITEM':
            var isItemChecked = state.cards[action.data.currCard.id].checklist[action.data.currCheckList.id].list[action.data.currItem.id].isChecked
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.data.currCard.id]:
                    {
                        ...state.cards[action.data.currCard.id],
                        checklist: {
                            ...state.cards[action.data.currCard.id].checklist,
                            [action.data.currCheckList.id]: {
                                ...state.cards[action.data.currCard.id].checklist[action.data.currCheckList.id],
                                list: {
                                    ...state.cards[action.data.currCard.id].checklist[action.data.currCheckList.id].list,
                                    [action.data.currItem.id]: {
                                        ...state.cards[action.data.currCard.id].checklist[action.data.currCheckList.id].list[action.data.currItem.id],
                                        isChecked: !isItemChecked
                                    }
                                },
                            }
                        }
                    },
                }
            }


        case 'SET_DUE_DATE':
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.data.currCard.id]:
                    {
                        ...state.cards[action.data.currCard.id],
                        dueDate: action.data.dueDate
                    }
                },
            };


        case 'CREATE_CHECKLIST':
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.data.currCard.id]:
                    {
                        ...state.cards[action.data.currCard.id],
                        checklist: { ...state.cards[action.data.currCard.id].checklist, [action.data.currChecklist.id]: action.data.currChecklist }
                    }
                },
            };

        case 'ADD_CHECKLIST_ITEM':
            return {
                ...state,

                cards: {
                    ...state.cards,
                    [action.data.currCard.id]:
                    {
                        ...state.cards[action.data.currCard.id],
                        checklist: {
                            ...state.cards[action.data.currCard.id].checklist,
                            [action.data.currCheckList.id]: {
                                ...state.cards[action.data.currCard.id].checklist[action.data.currCheckList.id],
                                list: { ...state.cards[action.data.currCard.id].checklist[action.data.currCheckList.id].list, [action.data.newItem.id]: action.data.newItem }
                            }
                        }
                    }
                },
            };
        case 'REMOVE_CHECKLIST_ITEM':
            var newChecklistToSave = state.cards[action.data.currCard.id].checklist[action.data.currCheckList.id]
            delete newChecklistToSave.list[action.data.itemToRemove.id]

            return {
                ...state,

                cards: {
                    ...state.cards,
                    [action.data.currCard.id]:
                    {
                        ...state.cards[action.data.currCard.id],
                        checklist: {
                            ...state.cards[action.data.currCard.id].checklist,
                            [action.data.currCheckList.id]: newChecklistToSave
                        }
                    }
                },
            };

        case 'REMOVE_CHECKLIST':
            var newChecklist = state.cards[action.data.currCard.id].checklist
            delete newChecklist[action.data.checkListToRemove.id]
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.data.currCard.id]:
                    {
                        ...state.cards[action.data.currCard.id],
                        checklist: newChecklist
                    }
                },
            };


        case 'CARD_COVER':
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.data.currCard.id]:
                        { ...state.cards[action.data.currCard.id], cardCover: action.data.color }
                },
            };

        case 'GET_CARDS_STATE':
            return {
                ...state,
            };

        case 'TOGGLE_CARD_DETAILS':
            return {
                ...state,
                isCardDetailShown: action.data
            };

        default:
            return state;
    }
}