import { combineReducers } from 'redux';
import boardReducer from './boardReducer'
import cardReducer from './cardReducer';
import listReducer from './listReducer';
import groupReducer from './groupReducer';


const rootReducer = combineReducers({
  boardReducer: boardReducer,
  listReducer: listReducer,
  cardReducer: cardReducer,
  groupReducer:groupReducer
})

export default rootReducer;