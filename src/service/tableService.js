const UTILS = require('./utils')
const cardService = require('./cardService')



function updateTable(start, source, destination, draggableId) {
  const newCardIds = Array.from(start.cardsIdsOrder)
  newCardIds.splice(source.index, 1)
  newCardIds.splice(destination.index, 0, draggableId)
  const updatedTable = {
    ...start,
    cardsIdsOrder: newCardIds
  }
  return updatedTable

}
function dragOutsideTable(start, source, destination, draggableId, finish) {
  const startCardIds = start.cardsIdsOrder
  startCardIds.splice(source.index, 1);

  const newStartTable = {
    ...start,
    cardsIdsOrder: startCardIds
  }

  const finishCardIds = finish.cardsIdsOrder
  finishCardIds.splice(destination.index, 0, draggableId);
  const newFinishTable = {
    ...finish,
    cardsIdsOrder: finishCardIds
  }
  return {
    newStartTable: newStartTable,
    newFinishTable: newFinishTable
  }

}

function dragTable(source, destination, draggableId, tables) {
  // console.log('source:', source);
  // console.log('destination:', destination);
  // console.log('draggableId:', draggableId);
  console.log('table:', tables);

  const newGroupsOrder = tables.groupsOrder
  newGroupsOrder.splice(source.index, 1)
  newGroupsOrder.splice(destination.index, 0, draggableId)
  return newGroupsOrder

}




async function copyTable(currBoard, tableToCopy, cards) {
  const copiedTableTitle = 'Copy of - ' + tableToCopy.title
  const newTable = await createTable(copiedTableTitle)
  const matchingCards = []
  const newCards = {}
  const cardIdsToCopy = tableToCopy.cardsIdsOrder
  _findMatchingCards(matchingCards, cardIdsToCopy, cards)

  matchingCards.forEach(
    card => {
      const cardCopy = copyCard(card)
      newCards[cardCopy.id] = cardCopy
      return
    }
  )
  newTable.cardsIdsOrder = Object.keys(newCards)

  const start = currBoard.tableOrder.findIndex(tableId => tableId === tableToCopy.id)
  const end = newTable.id
  const newTableOrder = currBoard.tableOrder
  newTableOrder.splice(start + 1, 0, end)

  return {
    copiedTable: newTable,
    copiedCards: newCards
  }
}


function getTableCards(cards, table) {
  const currCards = {}
  table.cardsIdsOrder.forEach((cardID) => { return cards[cardID] ? currCards[cardID] = cards[cardID] : '' })
  return currCards
}


function _findMatchingCards(matchingCards, cardsToCopy, allCards) {
  cardsToCopy.forEach(cardId => {
    const currCard = allCards[cardId]
    if (currCard) {
      matchingCards.push(currCard)
    }

  })

}

function createTable(title) {
  return {
    id: UTILS.generatePassword(6),
    title: title,
    cardsIdsOrder: [],
    createdAt: new Date().toLocaleDateString()
  }
}




function copyCard(cardToCopy) {
  const newCard = cardService.copyCard(cardToCopy)
  newCard.id = UTILS.generatePassword(5)
  return newCard
}



module.exports = {
  copyTable,
  getTableCards,
  dragTable,
  updateTable,
  dragOutsideTable,
  createTable
}
