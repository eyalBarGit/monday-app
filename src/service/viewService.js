import UTILS from './utils'

function createView(viewType) {
    return {
        id: UTILS.generatePassword(7),
        type: viewType,
        createdAt: new Date().toLocaleDateString()
    }
}

export default {
    createView
}