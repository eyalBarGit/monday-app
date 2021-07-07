import React from 'react';


export function CardCover({currCard}) {


    return (
        <div style={{backgroundColor:`${currCard.cardCover}`}} className="card-cover">
            <div className="main-content-card-cover">
            </div>
        </div>
    )
}

