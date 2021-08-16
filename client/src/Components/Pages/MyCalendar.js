import React from 'react';

import styles from '../Styles/Calendar.module.css'
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

function MyCalendar() {
    let events = [
        {
          start: moment().toDate(),
          end: moment()
            .add(1, "days")
            .toDate(),
          title: "Some title",
        }
      ]

      const handleEvent=(e)=>{
        console.log(e.title,'Event')
      }
      const handleSlot=(e)=>{
        console.log(e.title,'Slot')
      }
    return (
        <div className={styles['Calendar-Container']}>
             <Calendar

                localizer={localizer}
                events={events}
                defaultDate={new Date()}
                defaultView="month"
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                onSelectEvent={(handleEvent)}
                onSelectSlot={(handleSlot)}
            />
        </div>
    )
}

export default MyCalendar;