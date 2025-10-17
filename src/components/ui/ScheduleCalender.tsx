"use client";

import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { Button } from "./button";


export function ScheduleCalendar() {
  const [events, setEvents] = useState([
    { title: "code for some time", date: "2025-08-15" },
    { title: "lets talk", start: "2025-08-18T10:00:00", end: "2025-08-18T11:30:00" },
    { title: "play games", start: "2025-08-20", end: "2025-08-22" },
  ]);
  useEffect(() => {
    console.log(events);

  }, [events])

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

  useEffect(() => {
    if (!calendarRef.current) {
      return
    }


  }, [])
  return (
    <>


      {/* card */}
      <Card className="p-4 bg-transparent border-none " >
        <article className="flex flex-wrap mb-2 ">

          <div className="lg:w-[70%]  w-full">

            <aside className="w-full">
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
            </aside>

            <aside className="w-full">

              <FullCalendar
                ref={calendarRef}

                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay prev,today,next",
                  // right: "prev,today,next",
                  //   right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height="auto"

                selectable
                editable
                events={events}

                dayHeaderContent={(arg) => {
                  return (
                    <div
                      className=" text-[var(--text-color-one)] font-medium rounded-lg px-3 py-1  text-sm text-center"
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
            </aside>
          </div>

          {/* Your Appointments */}
          <div className="lg:w-[30%] w-full">
            <h1 className="text-center  text-lg">Your Next Appointment</h1>
            <section className="px-2 my-4">
              <aside>
                <div className="flex justify-between items-center "><span>Date</span> <span >Wed ,Aug,11</span></div>

                <div className="flex justify-between items-center border-t-1 border-gray-500 py-2"><span>Time</span> <span>12:30pm</span></div>
                <div className="flex justify-between items-center border-t-1 border-gray-500 py-2"><span>Services 1</span> <span>Engine Service</span></div>
                <div className="flex justify-between items-center border-t-1 border-gray-500 py-2"> <span>Services 2</span> <span>Tire Rotation</span></div>

                <Button variant={"ghost"} className="w-full border-1 border-gay-500 rounded-lg my-4">CTA</Button>
              </aside>
            </section>
          </div>
        </article>
      </Card>
    </>
  );
}
