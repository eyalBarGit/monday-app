import UTILS from '../../service/utils'
var initialState = UTILS.loadFromStorage('state')
if (!initialState)
    initialState = {
        favBoards: [],
        activeBoard: '',
        isCardDetailShown: false,
        isBgSideOpen: false,
        isInitialized: true,
        theme: 'light'
    };

export default function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            };
        default:
            return state;
    }
}