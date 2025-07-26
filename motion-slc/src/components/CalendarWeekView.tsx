"use client";
import { useState, useRef } from "react";
import { useCalendar } from "@/stores/calendar";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarWeekView() {
  const { events, moveEvent } = useCalendar();
  const [draggedEvent, setDraggedEvent] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const getEventStyle = (event: CalendarEvent) => {
    const startHour = event.start.getHours() + event.start.getMinutes() / 60;
    const duration =
      (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60);

    return {
      top: `${startHour * 60}px`, // 60px per hour
      height: `${duration * 60}px`,
      left: `${event.start.getDay() * 14.28}%`, // 100% / 7 days
      width: "14.28%",
    };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedEvent || !gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const x = e.clientX - rect.left;

    const hour = Math.floor(y / 60);
    const day = Math.floor((x / rect.width) * 7);

    const newStart = new Date();
    newStart.setDate(newStart.getDate() - newStart.getDay() + day + 1); // Monday = +1
    newStart.setHours(hour, 0, 0, 0);

    moveEvent(draggedEvent, newStart);
    setDraggedEvent(null);
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="grid grid-cols-8 border-b sticky top-0 bg-white z-10">
        <div className="p-4 border-r text-sm font-medium">Time</div>
        {DAYS.map((day) => (
          <div
            key={day}
            className="p-4 border-r text-sm font-medium text-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        ref={gridRef}
        className="relative grid grid-cols-8"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Time slots */}
        {HOURS.map((hour) => (
          <div key={hour} className="contents">
            <div className="p-2 border-r border-b text-xs text-gray-500 h-15">
              {hour.toString().padStart(2, "0")}:00
            </div>
            {DAYS.map((_, dayIndex) => (
              <div
                key={`${hour}-${dayIndex}`}
                className="border-r border-b h-15 relative"
              />
            ))}
          </div>
        ))}

        {/* Events */}
        {events.map((event) => (
          <div
            key={event.id}
            className="absolute bg-blue-500 text-white p-1 rounded text-xs cursor-move z-20 border border-blue-600"
            style={getEventStyle(event)}
            draggable
            onDragStart={() => setDraggedEvent(event.id)}
          >
            <div className="font-medium truncate">{event.title}</div>
            <div className="text-blue-100">
              {event.start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
