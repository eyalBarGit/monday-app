import React, { useState, useRef, } from 'react';
import { useDispatch, } from 'react-redux';
import { createBoard, changeBoardName, deleteBoard, addNewListId } from '../../../store/actions/boardActions';
import { createNewList } from '../../../store/actions/listActions'
import { ActionForm } from '../../ActionForm/ActionForm';
import { useHistory } from 'react-router';
import { DeleteVerify } from '../../CardDetails/DeleteVerify/DeleteVerify';

export function AppHeaderMenu({ onRemoveSavedBoard, onToggleAppHeaderMenu, currBoard }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const currRef = useRef(null);
    const [isAddBoardVis, setAddBoardVis] = useState(false)
    const [isChangeNameVis, setChangeName] = useState(false)
    const [isAddListVisible, setAddListVisibility] = useState(false)
    const [isDeleteVerify, setDeleteVerify] = useState(false)

    const onToggleAddList = () => {
        setAddListVisibility(!isAddListVisible)
    }

    const onAddList = async ({ listName }) => {
        const newList = await dispatch(createNewList(listName))
        dispatch(addNewListId(newList, currBoard))
        onToggleAppHeaderMenu()
    }

    const onCreateBoard = (data) => {
        dispatch(createBoard(data.boardTitle))
        onToggleAppHeaderMenu()
    }


    const onToggleAddBoard = () => {
        setAddBoardVis(!isAddBoardVis)
    }

    const onToggleBoardName = () => {
        setChangeName(!isChangeNameVis)
    }

    const onChangeBoardName = (data) => {
        dispatch(changeBoardName(currBoard, data.boardName))
        onToggleAppHeaderMenu()
    }


    const onDeleteBoard = () => {
        if (currBoard.isFav) {
            dispatch(onRemoveSavedBoard(currBoard))
        }
        dispatch(deleteBoard(currBoard))
        history.push('/')
        onToggleAppHeaderMenu()
    }


    const onToggleDleteBoard = () => {
        setDeleteVerify(!isDeleteVerify)
    }




    return (
        <div className="app-header-menu">
            <div className="container">
                <div className="title flex justify-center">
                    <h3>Board Actions</h3>
                </div>
                <hr />
                <div className="menu-actions">
                    {!isChangeNameVis &&
                        <p onClick={onToggleBoardName}>Change Board Name...</p>
                    }

                    {isChangeNameVis &&
                        <ActionForm name="boardName" placeholder={'Add Board Title'}
                            toggleAdd={onToggleBoardName} onSubmitFunc={onChangeBoardName} currRef={currRef} />
                    }
                    {!isAddBoardVis &&
                        <p onClick={onToggleAddBoard}>Create Board...</p>
                    }
                    {isAddBoardVis &&
                        <ActionForm name="boardTitle" placeholder={'Add Board Title'}
                            toggleAdd={onToggleAddBoard} onSubmitFunc={onCreateBoard} currRef={currRef} />
                    }
                    {!isDeleteVerify &&
                        <p onClick={onToggleDleteBoard}>Delete Board...</p>
                    }

                    {isDeleteVerify &&
                        <DeleteVerify itemToDelete={'board'} onToggle={onToggleDleteBoard} onDelete={onDeleteBoard} />
                    }
                    {!isAddListVisible &&
                        <p onClick={onToggleAddList}>Add List...</p>
                    }
                    {isAddListVisible &&
                        < ActionForm name="listName" placeholder={'Add list Title'}
                            toggleAdd={onToggleAddList} onSubmitFunc={onAddList} />
                    }
                </div>
            </div>
        </div>
    )
}

