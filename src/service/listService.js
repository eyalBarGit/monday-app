const UTILS = require('./utils')
const cardService = require('./cardService')



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





async function copyList(currBoard, listToCopy, cards) {
  const copiedListTitle = 'Copy of - ' + listToCopy.title
  const newList = await createList(copiedListTitle)
  const matchingCards = []
  const newCards = {}
  const cardIdsToCopy = listToCopy.cardIds
  _findMatchingCards(matchingCards, cardIdsToCopy, cards)

  matchingCards.forEach(
    card => {
      const cardCopy = copyCard(card)
      newCards[cardCopy.id] = cardCopy
      return
    }
  )
  newList.cardIds = Object.keys(newCards)

  const start = currBoard.listOrder.findIndex(listId => listId === listToCopy.id)
  const end = newList.id
  const newListOrder = currBoard.listOrder
  newListOrder.splice(start + 1, 0, end)

  return {
    copiedList: newList,
    copiedCards: newCards
  }
}


function getListCards(cards, list) {
  const currCards = {}
  list.cardIds.forEach((cardID) => { return cards[cardID] ? currCards[cardID] = cards[cardID] : '' })
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

function createList(title) {
  return {
    id: UTILS.generatePassword(6),
    title: title,
    cardIds: [],
    createdAt: new Date().toLocaleDateString()
  }
}




function copyCard(cardToCopy) {
  const newCard = cardService.copyCard(cardToCopy)
  newCard.id = UTILS.generatePassword(5)
  return newCard
}

function dragList(source, destination, draggableId, currBoard) {
  const newListOrder = currBoard.listOrder
  newListOrder.splice(source.index, 1)
  newListOrder.splice(destination.index, 0, draggableId)
  return newListOrder

}

module.exports = {
  copyList,
  getListCards,
  dragList,
  updateList,
  dragOutsideList,
  createList
}
