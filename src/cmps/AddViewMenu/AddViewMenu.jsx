import React, { useEffect } from 'react';
import { FaTable } from 'react-icons/fa'
import { AiOutlineCalendar, AiOutlinePieChart } from 'react-icons/ai'
import { BsKanban } from 'react-icons/bs'
import { FaWpforms } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { addView } from '../../store/actions/boardActions';



export function AddViewMenu({ setViewMenu }) {
    const dispatch = useDispatch()

    useEffect(() => {
        // component didMount
        return () => {
            // component willUnMount
        }
    }, [])

    const onAddView = (viewType) => {
        dispatch(addView(viewType))
        setViewMenu(false)
    }

    return (
        <div className="add-view-menu">
            <ul>
                <li onClick={() => onAddView('Table')}>
                    <span><FaTable /></span>Table
                </li>
                <li onClick={() => onAddView('Calendar')}>
                    <span><AiOutlineCalendar /></span>Calendar
                </li>
                <li onClick={() => onAddView('Chart')}>
                    <span><AiOutlinePieChart /></span>Chart
                </li>
                <li onClick={() => onAddView('Kanban')}>
                    <span><BsKanban /></span>Kanban
                </li>
                <li onClick={() => onAddView('Form')}>
                    <span><FaWpforms /></span>Form
                </li>
            </ul>
        </div>
    )



}