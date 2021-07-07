import React, { useEffect } from 'react';


export function ItemPreview({ onCheckItem, item, onRemoveCheckListItem, trash }) {
    
    useEffect(() => {
        return () => {
            
        }
    }, [])



    return (
        <div className="item-preview">
            <div
                key={item.id} className="main-content-checkbox flex space-between align-center">
                <div className="checkbox-container flex">
                    <input onChange={() => onCheckItem(item)} checked={item.isChecked} type="checkbox" value={item.text} /> <p>
                        {item.text}
                    </p>
                </div>
                <button onClick={() => onRemoveCheckListItem(item)}><span>{trash}</span></button>
            </div>
        </div>
    )
}


