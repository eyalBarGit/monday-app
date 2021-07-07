import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

export function MainContainer (props) {
 //   const state = useSelector(state => state.state)
 //   const dispatch = useDispatch()



   useEffect(() => {
   return () => {
   // componnent willUnmount
        }
    }, [])



    return (
        <div className="main-container">
        {props.children}
        </div>
    )
}

