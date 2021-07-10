import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

export function CalendarView() {
    // const state = useSelector(state => state.state)


    useEffect(() => {
        // component didMount
        return () => {
            // component willUnMount
        }
    }, [])


    // const [value, onSetValue] = useState(new Date());
    // const [change, setChange] = useState()

    const a = (event, day) => {
        console.log('event:', event)
        console.log('clicked!:', day)
    }
    return (
        <div className="calendar-view">
            <Calendar
                onChange={a}
                selectRange={true}
                // value={value}
                selectRange={true}
            // onClickDay={(day) => console.log('day:', day)}
            />

        </div>
    )



}