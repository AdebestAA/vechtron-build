"use client";

import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";


export function ScheduleCalendar() {
  const [events, setEvents] = useState([
    { title: "code for some time", date: "2025-08-15" },
    { title: "lets talk", start: "2025-08-18T10:00:00", end: "2025-08-18T11:30:00" },
    { title: "play games", start: "2025-08-20", end: "2025-08-22" },
  ]);
  

  const calendarRef = useRef<FullCalendar>(null);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value, 10);
    const calendarApi = calendarRef.current?.getApi();
    console.log(calendarApi);
    
    if (calendarApi) {
      const currentYear = calendarApi.getDate().getFullYear();
      calendarApi.gotoDate(new Date(currentYear, month, 1));
    }
  };

  return (
    <>


    {/* card */}
    <Card className="p-4 bg-transparent border-none " >
      <div className="flex justify-end mb-2">
        <select
          onChange={handleMonthChange}
          className="border px-2 py-1 rounded"
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ].map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
          left: "title",
          right: "prev,today,next",
          //   right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="auto"
        selectable
        editable
        events={events}
        
        dayHeaderContent={(arg) => {
            return (
                <div
                className=" text-[var(--text-color-one)] font-medium rounded-lg px-3 py-1 text-sm text-center"
                style={{ width: '100%' }}
                >
                {arg.text}
              </div>
            )
        }}
        dateClick={(info) => {
            const title = prompt("Enter event title");
            if (title) {
                setEvents([...events, { title, date: info.dateStr }]);
            }
           
        }}
        eventClick={(info) => alert(`Event: ${info.event.title}`)}
        />
    </Card>
        </>
  );
}
