import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { BsInbox, BsThreeDots } from 'react-icons/bs'
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io'
import { MdDashboard, MdNotificationsNone } from 'react-icons/md'
import Switch from '@material-ui/core/Switch';
import { Notifications } from '../Notifications/Notifications';
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai'
import { BiFilterAlt } from 'react-icons/bi'
import { IoMdAddCircleOutline } from 'react-icons/io'


export function SideBar() {

    const [isMenuWide, setMenu] = useState(false)
    const [isSlideOpen, setSlideDown] = useState(false)
    const [isNotifications, setNotifications] = useState(false)
    const [isClicked, setClick] = useState('boards')
    const boards = useSelector(state => state.boardReducer.boards)


    const onToggleNotifications = () => {
        setNotifications(!isNotifications)
    }

    const history = useHistory()
    return (
        <div className="side-bar flex">
            <div className="main-content-side-bar" >
                <div className="theme-btn flex justify-center">
                    {/* <Switch onChange={handleChange} /> */}
                </div>
                <ul className="list-items">
                    <Link to="/main/boards/14325143">
                        <li className={`boards ${isClicked === 'boards' ? 'clicked' : ''}`}
                            onClick={() => setClick('boards')}>
                            <div >
                                <MdDashboard />
                            </div>
                        </li>
                    </Link>
                    <li className={`notification-item ${isClicked === 'notification-item' ? 'clicked' : ''}`}
                        onClick={() => isClicked === 'notification-item' ? setClick('') : setClick('notification-item')} >
                        <div >
                            <MdNotificationsNone onClick={onToggleNotifications} />
                        </div>
                        {isNotifications && <Notifications />}
                    </li>
                    <Link to="/main/inbox">
                        <li className={`inbox ${isClicked === 'inbox' ? 'clicked' : ''}`}
                            onClick={() => setClick('inbox')}  >
                            <BsInbox />
                        </li>
                    </Link>
                </ul>
            </div>

            <div className="outer-side-bar"
                onMouseEnter={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}>
                <div className="hide-div"></div>
                <div className={`main-content-outer-side-bar  ${isMenuWide ? 'wide' : ''}`}>
                    <div className={`content-container ${isMenuWide ? 'vis' : 'hidden'}`}>
                        <div className="top-part">
                            <p>Workspace</p>
                            <h2>New Workspace</h2>
                            <ul>
                                <li>
                                    <span className="add-symbol"><IoMdAddCircleOutline /></span>Add
                                </li>
                                <li>
                                    <span><BiFilterAlt /></span>Filters
                                </li>
                                <li>
                                    <span><AiOutlineSearch /></span>Search
                                </li>
                            </ul>
                        </div>
                        <div className="mid-line margin-center" ></div>
                        <div className="outer-menu-bottom-part">
                            <ul className="outer-side-bar-items">
                                <li onClick={() => setSlideDown(!isSlideOpen)}>
                                    <div className="crm-section flex align-center" >
                                        {isSlideOpen ? <IoMdArrowDropdown className="arrow" /> : < IoMdArrowDropright className="arrow" />
                                        }
                                        <p> CRM</p>

                                    </div>
                                </li>
                                <SlideDown className={'my-dropdown-slidedown flex column align-center'}>
                                    {isSlideOpen && <React.Fragment>
                                        <ul className="crm-boards">
                                            {Object.keys(boards).map((boardId) => (
                                                <li key={boardId} className="crm-board flex space-between  align-center" onClick={
                                                    () => history.push(`/main/boards/${boardId}`)}>
                                                    <p className="board-name flex space-between align-center"> {boards[boardId].name} <span className="menu-btn">
                                                        <BsThreeDots />  </span></p>

                                                </li>)
                                            )
                                            }

                                        </ul>
                                    </React.Fragment>}
                                </SlideDown>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

