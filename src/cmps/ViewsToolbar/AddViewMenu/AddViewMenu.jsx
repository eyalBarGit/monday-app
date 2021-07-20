import React from 'react';
import { FaTable } from 'react-icons/fa'
import { AiOutlineCalendar, AiOutlinePieChart } from 'react-icons/ai'
import { BsKanban } from 'react-icons/bs'
import { FaWpforms } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { addView } from '../../../store/actions/boardActions';
import { useParams } from 'react-router';



export function AddViewMenu({ setAddViewMenu }) {
    const dispatch = useDispatch()
    const { boardid } = useParams()
    const boards = useSelector(state => state.boardReducer.boards)
    const currBoard = boards[boardid]

    const onAddView = (viewType) => {
        if (isViewExsited(viewType)) return
        dispatch(addView(viewType, boardid))
        setAddViewMenu(false)
    }

    const isViewExsited = (viewType) => {
        return currBoard.views.some((view) => view.type === viewType)
    }


    return (
        <div className="add-view-menu menu-shadow ">
            <ul>
                <li onClick={() => onAddView('Table')} className={`${isViewExsited('Table') ? 'disabled' : ''}`}>
                    <span><FaTable /></span>Table
                </li>
                <li onClick={() => onAddView('Calendar')} className={`${isViewExsited('Calendar') ? 'disabled' : ''}`}>
                    <span><AiOutlineCalendar /></span>Calendar
                </li>
                <li onClick={() => onAddView('Chart')} className={`${isViewExsited('Chart') ? 'disabled' : ''}`}>
                    <span><AiOutlinePieChart /></span>Chart
                </li>
                <li onClick={() => onAddView('Kanban')} className={`${isViewExsited('Kanban') ? 'disabled' : ''}`}>
                    <span><BsKanban /></span>Kanban
                </li>
                <li onClick={() => onAddView('Form')} className={`${isViewExsited('Form') ? 'disabled' : ''}`} >
                    <span><FaWpforms /></span>Form
                </li>
            </ul>
        </div>
    )



}