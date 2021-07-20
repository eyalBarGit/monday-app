import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai'
import { BiFilterAlt } from 'react-icons/bi'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { SlideDown } from 'react-slidedown'
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io'
import { BsThreeDots } from 'react-icons/bs'
import { useHistory } from 'react-router-dom';

export function OuterSideBar({ setMenu, theme, isMenuWide, setSlideDown, isSlideOpen }) {
    const boards = useSelector(state => state.boardReducer.boards)
    const history = useHistory()


    useEffect(() => {
        // component didMount
        return () => {
            // component willUnMount
        }
    }, [])


    return (
        <div className="outer-side-bar"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}>
            <div className={`hide-div ${theme === 'light' ? 'white-div' : ''} `}></div>
            <div className={
                `main-content-outer-side-bar  ${isMenuWide ? 'wide' : ''}`}>
                <div className={`content-container ${isMenuWide ? 'vis' : ''}`}>
                    <div className="top-part">
                        <p>Workspace</p>
                        <h2>New Workspace</h2>
                        <ul>
                            <li className="light-hover">
                                <span className="add-symbol"><IoMdAddCircleOutline /></span>Add
                            </li>
                            <li className="light-hover">
                                <span><BiFilterAlt /></span>Filters
                            </li>
                            <li className="light-hover">
                                <span><AiOutlineSearch /></span>Search
                            </li>
                        </ul>
                    </div>
                    <div className="mid-line margin-center shadow-line" ></div>
                    <div className="outer-menu-bottom-part">
                        <div className="crm-section flex align-center light-hover" onClick={() => setSlideDown(!isSlideOpen)}>
                            {isSlideOpen ? <IoMdArrowDropdown className="arrow" /> : < IoMdArrowDropright className="arrow" />
                            }
                            <div className="crm-line flex space-between ">
                                <p> CRM</p>  <span className="menu-btn ">
                                    <BsThreeDots />  </span>
                            </div>
                        </div>
                        <ul>
                            <SlideDown className={'my-dropdown-slidedown flex column align-center'}>
                                {isSlideOpen && <React.Fragment>
                                    {Object.keys(boards).map((boardId) => (
                                        <li key={boardId} className="flex space-between  align-center light-hover" onClick={
                                            () => history.push(`/main/boards/${boardId}`)}>
                                            {boards[boardId].name} <span className="menu-btn">
                                                <BsThreeDots />  </span>
                                        </li>)
                                    )
                                    }
                                </React.Fragment>}
                            </SlideDown>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )



}