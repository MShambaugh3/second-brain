import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleDateClick = async (info) => {
    const title = prompt("Enter event title:");
    if (!title) return;

    const newEvent = { title, date: info.dateStr };

    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    setEvents([...events, newEvent]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
}
