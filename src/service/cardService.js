const UTILS = require('../service/utils')


function createCard(cardTitle, description = '') {
  return {
    id: UTILS.generatePassword(5),
    title: cardTitle,
    desc: description,
    checklist: {},
    cardCover: '',
    isWatched: false,
    labels: [],
    dueDate: '',
    createdAt: new Date().toLocaleDateString()
  }
}





function deleteCard(currBoard, currList, cardId) {
  const newCards = currBoard.cards
  delete newCards[cardId]

  const newCardIds = currList.cardIds.filter((cardsId) => cardsId !== cardId)
  currList.cardIds = newCardIds

  return { currBoard: currBoard, currList: currList, cardId }
}



function copyCard(cardToCopy) {
  const newCard = JSON.parse(JSON.stringify(cardToCopy))
  newCard.id = UTILS.generatePassword(5)
  return newCard
}





function createCheckList(checkListName) {
  return {
    id: UTILS.generatePassword(5),
    name: checkListName,
    list: {},
    createdAt: new Date().toLocaleDateString()
  }
}


function createCheckListItem(itemName) {
  return {
    id: UTILS.generatePassword(5),
    text: itemName,
    isChecked: false,
    createdAt: new Date().toLocaleDateString()
  }
}

function removeLabel(currCard, labelIndex) {
  currCard.labels.splice(labelIndex, 1)
  const newLabelList = currCard.labels
  return newLabelList
}



module.exports = {
  deleteCard,
  copyCard,
  createCheckList,
  createCheckListItem,
  removeLabel,
  createCard
}