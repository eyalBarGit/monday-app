const UTILS = require('./utils')

function getState() {
  return initialState
}

function createBoard() {
  return {
    id: UTILS.generatePassword(4),
    cards: {

    },
    lists: {

    },
    listOrder: [],
  }
}

function createCard(title) {
  return {
    id: UTILS.generatePassword(4),
    title: title,
    content: ''
  }
}

function createList() {
  return {
    id: 'list-1',
    title: 'todo',
    cardIds: []

  }
}
function getCurrBoard(boardId) {
  const currBoard = _getById(boardId)
  return currBoard
}

function _getById(boardId) {
  return initialState.boards[boardId]
}

const initialState = {
 
}

export default {
  getState,
  createBoard,
  createCard,
  createList,
  getCurrBoard
}
