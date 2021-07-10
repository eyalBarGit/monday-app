const UTILS = require('./utils')

function createBoard(boardName) {
  return {
    id: UTILS.generatePassword(4),
    name: boardName,
    isFav: false,
    listOrder: [],
    backgroundImg: 'sky',
    navBarTheme: 'bright',
    createdAt: new Date().toLocaleDateString(),
    views: [{ id: 'X3SsvH4', type: 'Kanban', createdAt: new Date().toLocaleDateString() }]


  }


}

function createCard(title) {
  return {
    id: UTILS.generatePassword(5),
    title: title,
    content: '',
    createdAt: new Date().toLocaleDateString()
  }

}

function createList(title) {
  return {
    id: UTILS.generatePassword(6),
    title: title,
    cardIds: [],
    createdAt: new Date().toLocaleDateString()
  }
}

function saveToStorage(key, store) {

  UTILS.saveToStorage(key, store)

}

function updateList(start, source, destination, draggableId) {
  const newCardIds = Array.from(start.cardIds)
  newCardIds.splice(source.index, 1)
  newCardIds.splice(destination.index, 0, draggableId)
  const updatedList = {
    ...start,
    cardIds: newCardIds
  }
  return updatedList

}

function dragOutsideList(start, source, destination, draggableId, finish) {
  const startCardIds = start.cardIds
  startCardIds.splice(source.index, 1);

  const newStartList = {
    ...start,
    cardIds: startCardIds
  }

  const finishCardIds = finish.cardIds
  finishCardIds.splice(destination.index, 0, draggableId);
  const newFinishList = {
    ...finish,
    cardIds: finishCardIds
  }
  return {
    newStartList: newStartList,
    newFinishList: newFinishList
  }

}
function dragList(source, destination, draggableId, currBoard) {
  const newListOrder = currBoard.listOrder
  newListOrder.splice(source.index, 1)
  newListOrder.splice(destination.index, 0, draggableId)
  return newListOrder

}


module.exports = {
  saveToStorage,
  createBoard,
  createCard,
  createList,
  dragOutsideList,
  updateList,
  dragList
}
