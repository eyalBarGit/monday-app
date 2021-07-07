import React from 'react';

export function ProgressBar({ bgcolor, completed }) {

    const fillerStyles = {
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        fontWeight: 'bold'
    }




    return (
        <div className="progress-bar flex align-center">
            <span style={labelStyles}>{` ${completed}%  `}</span>
            <div></div>
            <div className="wrapper" style={fillerStyles}>
            </div>
        </div>
    )
}

