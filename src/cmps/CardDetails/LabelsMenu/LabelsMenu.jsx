import React from 'react';
import { ColorPallette } from '../../ColorPallette/ColorPallette';

export function LabelsMenu({  onToggleColor ,onSetLabel}) {
    return (
        <div className="labels-menu">
            <ColorPallette onToggleColor={onToggleColor} onSelectColor={onSetLabel} />
        </div>
    )
}

