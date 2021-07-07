import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { removeCheckList, addCheckListItem, removeCheckListItem, checkItem } from '../../../store/actions/cardActions'
import { ProgressBar } from '../../ProgressBar/ProgressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ActionForm } from '../../ActionForm/ActionForm';
import { useCallback } from 'react';
import { ItemPreview } from './ItemPreview/ItemPreview'

export function CardCheckList({ currCheckList, currCard, currBoard }) {
    const checklistName = currCheckList.name
    const [isAddItemVisible, setItemVisible] = useState(false)
    const [checkedItems, setCheckItems] = useState([])
    const [currCheckItem, setCurrCheckItem] = useState()
    const [completed, setCompleted] = useState(0)
    const dispatch = useDispatch()
    const itemName = useRef(null);

    const trash = <FontAwesomeIcon icon={faTrashAlt} />
    const checklist = <FontAwesomeIcon icon={faTasks} />

    const onAddCheckItem = ({ listItem }) => {
        if (!listItem) return
        dispatch(addCheckListItem(currBoard, currCard, currCheckList, listItem))
        onToggleItemVisibility()
    }


    const calculatePercentage = useCallback(
        () => {
            var numberOfCheckLists = Object.values(currCheckList.list).length;
            var numberOfCehckedItems = checkedItems.length;
            var percent = (numberOfCehckedItems * 100) / numberOfCheckLists;
            isNaN(percent) ? setCompleted(0) : setCompleted(percent.toFixed())
        },
        [currCheckList.list, checkedItems.length],
    )


    useEffect(() => {
        calculatePercentage()

    }, [checkedItems, calculatePercentage])

    const onRemoveCheckList = () => { dispatch(removeCheckList(currCard, currCheckList)) }

    const onRemoveCheckListItem = useCallback(
        (item) => {
            const index = checkedItems.findIndex((checkedItem) => checkedItem.id === item.id)
            dispatch(removeCheckListItem(currBoard, currCard, currCheckList, item))
            let newCheckedItems = checkedItems
            newCheckedItems.splice(index, 1)
            setCheckItems([...newCheckedItems])
        },
        [ currBoard, currCard, currCheckList, dispatch, checkedItems,]
    )



    const onToggleItemVisibility = () => {
        setItemVisible(!isAddItemVisible)
    }


    const onCheckItem = (item) => {
        const currItem = currCheckList.list[item.id]
        setCurrCheckItem(currItem)
        const index = checkedItems.findIndex((checkedItem) => checkedItem.id === item.id)
        if (item.isChecked) {
            let newCheckedItems = checkedItems
            newCheckedItems.splice(index, 1)
            setCheckItems([...newCheckedItems])
            dispatch(checkItem(currBoard, currCard, currCheckList, currItem))
            // calculatePercentage()
            return
        }

        setCheckItems([...checkedItems, { ...item }])
        dispatch(checkItem(currBoard, currCard, currCheckList, currItem))
        // calculatePercentage()
    }




    const updatePercentageOnMount = useCallback(
        () => {
            const keys = Object.keys(currCheckList.list)
            const lists = []
            const checkedItems = []

            keys.forEach((key) => {
                lists.push(currCheckList.list[key])
            })
            lists.forEach((item) => {
                if (item.isChecked) {
                    checkedItems.push(item)
                    setCheckItems([...checkedItems])
                }

            })

        },
        [currCheckList.list],
    )

    useEffect(() => {
        calculatePercentage()
    }, [calculatePercentage, currCheckItem, currCheckList])


    useEffect(() => {
        updatePercentageOnMount()
    }, [updatePercentageOnMount])


    return (
        <div className="card-check-list">
            <div className="card-check-list-section flex space-between">
                <div className="title-container flex align-center">

                    <div className="icon">
                        {checklist}
                    </div>
                    <div className="check-list-title">
                        <h3>{checklistName}</h3>
                    </div>
                </div>
                <p className="delete-checklist" onClick={onRemoveCheckList}>Delete</p>
            </div>
            <ProgressBar bgcolor="#c9c9ca" completed={completed} />
            <div className="list">
                {Object.values(currCheckList.list).map(item =>
                    <ItemPreview key={item.id} onCheckItem={onCheckItem} onRemoveCheckListItem={onRemoveCheckListItem} trash={trash} item={item} />
                )}
            </div>
            {!isAddItemVisible &&
                <div className="add-item-btn">
                    <button onClick={onToggleItemVisibility}>Add an item</button>
                </div>
            }
            <div className="check-list-action">
                {
                    isAddItemVisible &&
                    <ActionForm currRef={itemName} toggleAdd={onToggleItemVisibility} onSubmitFunc={onAddCheckItem} name={'listItem'} placeholder={'Item title'} />
                }
            </div>
        </div >
    )
}

