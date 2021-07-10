const UTILS = require('./utils')

function createView(viewType) {
    return {
        id: UTILS.generatePassword(7),
        type: viewType,
        createdAt: new Date().toLocaleDateString(),
        isDefault: false,
    }
}

module.exports = {
    createView
}