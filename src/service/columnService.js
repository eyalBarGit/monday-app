const utils = require('../service/utils')
const KEY = "TASKS"
function _getColumns() {
    var gColumns = {
        'column-1': {
            id: 'column-1',
            title: 'To do ',
            taskIds: ['task-1', 'task-11', 'task-12', 'task-13', 'task-14', 'task-21'],
            background: getRandomColor()
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: ['task-2', 'task-15', 'task-16'],
            background: getRandomColor()
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: ['task-3', 'task-18', 'task-17', 'task-24'],
            background: getRandomColor()
        },
        'column-4': {
            id: 'column-4',
            title: "P.S",
            taskIds: ['task-4', 'task-5', 'task-20', 'task-22'],
            background: getRandomColor()
        },
        'column-5': {
            id: 'column-5',
            title: "Last minute",
            taskIds: ['task-6', 'task-7', 'task-8', 'task-23'],
            background: getRandomColor()
        },
        'column-6': {
            id: 'column-6',
            title: "For Work",
            taskIds: ['task-9', 'task-10', 'task-19'],
            background: getRandomColor()
        },
        columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6'],
        isDelMsgShown: true
    }
    utils.saveToStorage(KEY, gColumns)
    return gColumns
}

async function createColumn(title) {
    if (!title) { title = 'New List' }
    const column = {
        id: utils.generatePassword(4),
        title: title,
        taskIds: [],
        background: getRandomColor(),

    }
    return column
}
function removeColumn(columns, columnToRemove) {
    const newColumns = columns
    const newColumnIds = newColumns.columnOrder.filter(col => col !== columnToRemove)
    delete newColumns[columnToRemove]
    newColumns.columnOrder = newColumnIds
    return newColumns
}


async function reorderColumns(columnOrder, source, destination, draggableId) {
    const newColumnOrder = Array.from(columnOrder)
    newColumnOrder.splice(source.index, 1)
    newColumnOrder.splice(destination.index, 0, draggableId)
    return newColumnOrder
}

function getRandomColor() {
    const color = hexToRgb('653d9e')
    const r = getRandomIntInclusive(0, color.r)
    const g = getRandomIntInclusive(50, color.g)
    const b = getRandomIntInclusive(50, color.b)
    return generateShadesColor(r, g, b)
}

function generateShadesColor(red, green, blue) {
    var r = red % 256;
    var g = green % 256;
    var b = blue % 256;
    r += 33;
    g += 33;
    b += 33;
    var color = `rgba(${r},${g},${b},75%)`
    return color
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hexToRgb(hex = '#4D8076') {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function saveToStorage(state) {
    utils.saveToStorage(KEY, state)
}
export default {
    removeColumn,
    saveToStorage,
    _getColumns,
    createColumn,
    getRandomColor,
    hexToRgb,
    reorderColumns,
}
