import React from 'react';


export function DeleteVerify({ onDelete, onToggle,itemToDelete }) {

    return (
        <div className="delete-verify">
            <div className="main-content-delete flex column">
                <p>Delete this {itemToDelete}?</p>
                <div className="btns flex space-between">

                    <button className="dlt-btn" onClick={onDelete}>Delete</button>
                    <button onClick={onToggle}>X</button>
                </div>
            </div>
        </div>
    )
}

