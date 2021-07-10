import React, { useEffect } from 'react';
// import {  useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai'
import { BiFilterAlt } from 'react-icons/bi'
import { FiChevronDown } from 'react-icons/fi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export function BoardToolbar() {
    // const state = useSelector(state => state.state)
    const person = <FontAwesomeIcon icon={faUserCircle} />


    useEffect(() => {
        // component didMount
        return () => {
            // component willUnMount
        }
    }, [])


    return (
        <div className="board-toolbar">
            <ul className="flex align-center">
                <li className="new-deal">
                    <button>New Deal</button><span className="new-deal-dropdown"><button><FiChevronDown /></button></span>
                </li>
                <li>
                    <button><span className="icon"><AiOutlineSearch /></span>Search</button>
                </li>
                <li>
                    <button><span className="icon">{person}</span>Person</button>
                </li>
                <li>
                    <button><span className="icon"><BiFilterAlt /></span>Filter </button>
                </li>
            </ul>

        </div>
    )



}