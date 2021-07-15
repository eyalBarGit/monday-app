import { combineReducers } from 'redux';
import boardReducer from './boardReducer'
import cardReducer from './cardReducer';
import listReducer from './listReducer';
import tableReducer from './tableReducer';
import stateReducer from './stateReducer';


const rootReducer = combineReducers({
  boardReducer: boardReducer,
  listReducer: listReducer,
  cardReducer: cardReducer,
  tableReducer: tableReducer,
  stateReducer:stateReducer
})

export default rootReducer;