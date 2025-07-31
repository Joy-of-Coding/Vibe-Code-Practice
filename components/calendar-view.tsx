"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { EventModal } from "@/components/event-modal";
import { EventCard } from "@/components/event-card";
import { format, addDays } from "date-fns";

// Sample event data
const initialEvents = [
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly sync with the product team",
    date: new Date(),
    startTime: "10:00",
    endTime: "11:00",
    color: "blue",
  },
  {
    id: "2",
    title: "Lunch with Alex",
    description: "Discuss new project ideas",
    date: addDays(new Date(), 1),
    startTime: "12:30",
    endTime: "13:30",
    color: "green",
  },
  {
    id: "3",
    title: "Review Designs",
    description: "Go through the latest UI mockups",
    date: addDays(new Date(), 2),
    startTime: "14:00",
    endTime: "15:00",
    color: "purple",
  },
];

export default function CalendarView() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsModalOpen(true);
    }
  };

  const handleAddEvent = (event: any) => {
    setEvents([...events, { ...event, id: String(events.length + 1) }]);
    setIsModalOpen(false);
  };

  const todaysEvents = events.filter(
    (event) => format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  return (
    <div className="flex flex-col h-full p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">{format(date, "MMMM yyyy")}</h2>
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newDate = new Date(date);
                  newDate.setMonth(date.getMonth() - 1);
                  setDate(newDate);
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newDate = new Date(date);
                  newDate.setMonth(date.getMonth() + 1);
                  setDate(newDate);
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && setDate(date)}
            className="rounded-md border"
          />
          <Button
            variant="outline"
            className="w-full mt-4 bg-transparent"
            onClick={() => setDate(new Date())}
          >
            Today
          </Button>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-medium mb-4">
            {format(date, "EEEE, MMMM d")}
          </h2>
          <div className="space-y-3">
            {todaysEvents.length > 0 ? (
              todaysEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No events scheduled for today. Click "New Event" to add one.
              </p>
            )}
          </div>
        </Card>
      </div>

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddEvent}
          selectedDate={selectedDate || date}
        />
      )}
    </div>
  );
}
