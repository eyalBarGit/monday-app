import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Table() {
    const state = useSelector(state => state.state)


    useEffect(() => {
        // component didMount
        return () => {
            // component willUnMount
        }
    }, [])


    return (
        <div className="table">
            <h2>Table</h2>

        </div>
    )



}