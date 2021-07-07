import React from 'react';
import { Link } from 'react-router-dom';

export function MainApp(props) {
    return (
        <div>
            <h1>Hello World!</h1>
            <Link to="main"><button>Go To Main</button></Link>
        </div>
    )
} 