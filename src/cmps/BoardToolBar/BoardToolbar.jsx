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
                <div className="new-deal flex">
                    <button className="board-tool">New Deal</button><span className="new-deal-dropdown"><button className="arrow-btn flex justify-center board-tool"><FiChevronDown /></button></span>
                </div>
                <div className="board-tool">
                    <button><span className="icon"><AiOutlineSearch /></span>Search</button>
                </div>
                <div className="board-tool">
                    <button><span className="icon">{person}</span>Person</button>
                </div>
                <div className="board-tool">
                    <button><span className="icon"><BiFilterAlt /></span>Filter </button>
                </div>
            </ul>

        </div>
    )



}