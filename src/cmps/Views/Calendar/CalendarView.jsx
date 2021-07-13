import React from 'react';
import Calendar from 'react-calendar';


export function CalendarView() {

    const value = new Date();
    const a = () => {
        var date = new Date(2021, 1, 1);
        console.log('date:', date)
    }


    return (
        <div className="calendar-view">
            <Calendar
                allowPartialRange={true}
                selectRange={true}
                value={value}
                onClickDay={() => a()}
                showNeighboringMonth={false}
            />

        </div>
    )



}