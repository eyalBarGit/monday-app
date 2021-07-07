import taskService from '../../service/taskService'

const storageState = taskService.setState()
const initialState = storageState

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: { ...state.tasks, [action.newTask.id]: action.newTask },
                columns: {
                    ...state.columns,
                    [action.newTask.column]: { ...state.columns[action.newTask.column], taskIds: [...state.columns[action.newTask.column].taskIds, action.newTask.id] }
                }
            }
        case 'REMOVE_TASK':
            return {
                ...state,
                tasks: action.task.tasks,
                columns: {
                    ...state.columns,
                    [action.task.column]: { ...state.columns[action.task.column], taskIds: [...action.task.taskIds] }
                },

            }
        case 'ADD_FAKE_DATA':
            return {
                ...state,
                tasks: { ...state.tasks, ...action.fakeData.tasks },
                columns: {
                    ...state.columns, ...action.fakeData.columns,
                    columnOrder: [...state.columns.columnOrder, ...action.fakeData.columns.columnOrder]
                },

            }
        case 'HIDE_DELETE_MSG':
            return {
                ...state,
                columns: {
                    ...state.columns,
                    isDelMsgShown: action.isMessageShown,
                },

            }

        case 'SET_BACKGROUND':
            return {
                ...state,
                themeColor: action.color,
            }

        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: { ...state.tasks, [action.task.id]: action.task },
            }
        case 'ADD_DESCRIPTION':
            return {
                ...state,
                tasks: { ...state.tasks, [action.task.id]: { ...state.tasks[action.task.id], description: action.description } },
            }

        case 'SET_TASKS':
            return {
                ...state,
                tasks: action.tasks
            };
        case 'SET_COLUMN':
            return {
                ...state,
                columns: action.columns
            };
        case 'UPDATE_COLUMN':
            return {
                ...state,
                columns: { ...action.column, isDelMsgShown: state.columns.isDelMsgShown },
            };

        case 'ADD_COLUMN':
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.column.id]: action.column,
                    columnOrder: [...state.columns.columnOrder, action.column.id]
                },
            };
        case 'REMOVE_COLUMN':
            return {
                ...state,
                columns: action.column
            }
        case 'REMOVE_IMG':
            return {
                ...state,
                tasks: { ...state.tasks, [action.currTask.id]: { ...state.tasks[action.currTask.id], imgLink: '' } }
            }

        case 'CHANGE_COLUMN_ORDER':
            return {
                ...state,
                columns: { ...state.columns, columnOrder: action.newColumnOrder }
            }
        case 'ADD_COMMENT':
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.currTask.id]: {
                        ...state.tasks[action.currTask.id],
                        comments: { ...state.tasks[action.currTask.id].comments, [action.currComment.id]: action.currComment }
                    }
                }
            }


        case 'GET_STATE':
            console.log('this is state:', state)
            return { ...state }

        default:
            return state;
    }
}