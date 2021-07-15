import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsInbox } from 'react-icons/bs'
import { MdDashboard, MdNotificationsNone } from 'react-icons/md'
import { Notifications } from '../Notifications/Notifications';
import 'react-slidedown/lib/slidedown.css'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropleft } from 'react-icons/io'
import { toggleTheme } from '../../store/actions/boardActions'
import { OuterSideBar } from './OuterSideBar/OuterSideBar';

export function SideBar() {
    const { theme } = useSelector(state => state.stateReducer)

    const [isMenuWide, setMenu] = useState(false)
    const [isSlideOpen, setSlideDown] = useState(false)
    const [isNotifications, setNotifications] = useState(false)
    const [isClicked, setClick] = useState('boards')
    const dispatch = useDispatch()


    const onToggleNotifications = () => {
        setNotifications(!isNotifications)
    }
    const onSelectItem = (item) => {
        setClick(item)
        if (isNotifications) setNotifications(false)
    }


    return (
        <div className="side-bar flex">
            <div className="main-content-side-bar" >
                <ul className="list-items">
                    <Link to="/main/boards/14325143">
                        <li className={`inner-side-bar boards-link ${isClicked === 'boards' ? 'active' : ''}`}
                            onClick={() => onSelectItem('boards')}>
                            <MdDashboard />
                            <span>
                                {isClicked === 'boards' && <IoMdArrowDropleft className="sidebar-arrow" />}
                            </span>
                        </li>
                    </Link>
                    <li className={`inner-side-bar notification-item ${isClicked === 'notification-item' ? 'active' : ''}`}
                        onClick={() => isClicked === 'notification-item' ? setClick('') : setClick('notification-item')} >
                        <MdNotificationsNone onClick={onToggleNotifications} />
                        {isNotifications && <Notifications />}
                        <span>
                            {isClicked === 'notification-item' && <IoMdArrowDropleft className="sidebar-arrow" />}
                        </span>
                    </li>
                    <Link to="/main/inbox">
                        <li className={`inner-side-bar  inbox ${isClicked === 'inbox' ? 'active' : ''}`}
                            onClick={() => onSelectItem('inbox')}  >
                            <BsInbox />
                            <span>
                                {isClicked === 'inbox' && <IoMdArrowDropleft className="sidebar-arrow" />}
                            </span>
                        </li>
                    </Link>
                </ul>
                <button onClick={() => dispatch(toggleTheme())} style={{ color: '#fff' }}>Theme</button>
            </div>
            <OuterSideBar setSlideDown={setSlideDown} setMenu={setMenu} theme={theme} isSlideOpen={isSlideOpen} isMenuWide={isMenuWide} />
        </div >
    )
}

