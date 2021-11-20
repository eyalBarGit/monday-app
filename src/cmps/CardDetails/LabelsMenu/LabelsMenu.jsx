import { React, useEffect } from 'react';
import { ColorPallette } from '../../ColorPallette/ColorPallette';
import PropTypes from 'prop-types'; // ES6
export function LabelsMenu({ onToggleColor, onSetLabel }) {

    useEffect(() => {
        console.log('onSetLabel:', onSetLabel)

    }, [onSetLabel])

    return (
        <div className="labels-menu">
            <ColorPallette onToggleColor={onToggleColor} onSelectColor={onSetLabel} />
        </div>
    )
}
LabelsMenu.propTypes = {
    onToggleColor: PropTypes.string.isRequired
}
