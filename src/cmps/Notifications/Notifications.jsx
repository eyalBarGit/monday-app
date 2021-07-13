import React, { useEffect, } from 'react';




export function Notifications() {


    useEffect(() => {
        // component didMount
        return () => {
            // component willUnMount
        }
    }, [])


    return (
        <div className="notifications">
            <h2>notifications</h2>
            <div className="notifications-top-bar ">
                <ul className="flex space-between">
                    <li>
                        <p>All</p>
                    </li>
                    <li>
                        <p>Unread</p>
                    </li>
                    <li>
                        <p>I was mentioned</p>
                    </li>
                    <li>
                        <p>Assgined to me</p>
                    </li>
                </ul>
            </div>
        </div>
    )



}