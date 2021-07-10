import React, { useEffect, useRef, useState } from 'react';
export function ActionForm({ placeholder, name, onSubmitFunc, toggleAdd }) {

    const currRef = useRef(null);

    useEffect(() => {
        currRef.current.focus();

    }, [currRef])

    const [text, setText] = useState('')
    const onHandleInput = ({ target }) => {
        const value = target.value
        setText(value)
    }



    return (
        <div className="action-form">
            <form >
                <div className="flex column">
                    <input name={name} type="text"
                        style={{ resize: "none" }}
                        ref={(e) => {
                            currRef.current = e
                        }} placeholder={placeholder}
                        autoComplete="off"
                        onInput={onHandleInput}
                    />
                    <div className="btns-section flex space-between">
                        <button onClick={(ev) => onSubmitFunc(ev, text)} className="add-btn" >Add</button>
                        <button onClick={toggleAdd} >X</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

