import React from 'react';

export function ColorPallette({ onSelectColor, onToggleColor }) {
    const colors = [
        { color: 'red', code: '#e04a4a' },
        { color: 'Green', code: '#037F4C' },
        { color: 'purpule', code: '#ab4ae0' },
        { color: 'orange', code: '#f9af4d' },
        { color: 'blue', code: '#3874ed' },
        { color: 'yellow', code: '#ffff51' },
        { color: 'noCover', code: '', text: 'None' }
    ]



    return (
        <div className="color-pallette">
            <div className="flex wrap space-between">
                {colors.map(color =>
                    <div key={color.code} onClick={() => onSelectColor(color.code)} className="color" style={{ backgroundColor: color.code }}>
                        {color.text && <p>{color.text}</p>}
                    </div>
                )}
                <button onClick={onToggleColor}>Close</button>

            </div>
        </div>
    )
}

