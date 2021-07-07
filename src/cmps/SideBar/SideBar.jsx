import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdBorderColor } from 'react-icons/md';
import { BsInbox } from 'react-icons/bs'
import { IoMdArrowDropdown, IoMdArrowDropup, } from 'react-icons/io'
import { MdDashboard, MdNotificationsNone } from 'react-icons/md'
import Switch from '@material-ui/core/Switch';
import { Notifications } from '../Notifications/Notifications';
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

export function SideBar() {

    const [isMenuWide, setMenu] = useState(false)
    const [isSlideOpen, setSlideDown] = useState(false)
    const [theme, setTheme] = useState('dark')
    const [isNotifications, setNotifications] = useState(false)


    const handleChange = () => {
        theme === "dark" ? setTheme('light') : setTheme('dark')
    }


    const onToggleNotifications = () => {
        setNotifications(!isNotifications)
    }


    return (
        <div className="side-bar flex">
            <div className={`main-content-side-bar ${theme}-inner`} onClick={isNotifications ? () => setNotifications(false) : null}>
                <div className="theme-btn flex justify-center">
                    <Switch onChange={handleChange} />
                </div>
                <ul className="list-items">
                    <Link to="/main/boards/board-1"><li>
                        <div className="boards">
                            <MdDashboard />
                        </div>
                    </li>
                    </Link>
                    <li onClick={onToggleNotifications} >
                        <div className="notification-item">
                            <MdNotificationsNone />
                            {isNotifications && <Notifications />}

                        </div>
                    </li>
                    <Link to="/main/inbox">
                        <li >
                            <BsInbox />
                        </li>
                    </Link>
                </ul>
            </div>

            <div className={`outer-side-bar ${theme}-outer`} onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
                <div className={`main-content-outer-side-bar  ${isMenuWide ? 'wide' : ''}`}>
                    <div className={`content-container ${isMenuWide ? 'vis' : 'hidden'}`}>
                        <h2>hi</h2>
                        <ul className="outer-side-bar-items">
                            <li onClick={() => setSlideDown(!isSlideOpen)}>
                                <div className="orders-section" >
                                    <div className="flex " >
                                        <MdBorderColor />
                                        {isSlideOpen ? <IoMdArrowDropup className="arrow" /> : <IoMdArrowDropdown className="arrow" />}
                                    </div>
                                </div>
                            </li>
                            <div className="flex column">
                                <SlideDown className={'my-dropdown-slidedown flex column align-center'}>
                                    {isSlideOpen && <div>
                                        <p>orders</p>
                                        <p>History</p>
                                    </div>}
                                </SlideDown>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

