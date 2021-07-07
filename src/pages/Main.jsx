import React from 'react';
import { Link } from 'react-router-dom';

export function Main(props) {
    return (
        <div>
            <h1>This is Main</h1>
            <Link to="/"><button>Go Back</button></Link>
        </div>
    )
} 