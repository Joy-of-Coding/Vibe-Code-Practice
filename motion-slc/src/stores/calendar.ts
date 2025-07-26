// stores/calendar.ts
import { create } from "zustand";
import { Task, CalendarEvent } from "@/types";

interface CalendarState {
  tasks: Task[];
  events: CalendarEvent[];
  selectedDate: Date;
  addTask: (task: Omit<Task, "id" | "created_at">) => void;
  scheduleTask: (taskId: string, startTime: Date) => void;
  moveEvent: (eventId: string, newStart: Date) => void;
}

export const useCalendar = create<CalendarState>((set, get) => ({
  tasks: [],
  events: [],
  selectedDate: new Date(),

  addTask: (taskData) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...taskData,
          id: crypto.randomUUID(),
          created_at: new Date(),
        },
      ],
    })),

  scheduleTask: (taskId, startTime) =>
    set((state) => {
      const task = state.tasks.find((t) => t.id === taskId);
      if (!task) return state;

      const event: CalendarEvent = {
        id: crypto.randomUUID(),
        title: task.title,
        start: startTime,
        end: new Date(startTime.getTime() + task.duration * 60000),
        type: "task",
        task_id: taskId,
      };

      return { events: [...state.events, event] };
    }),

  moveEvent: (eventId, newStart) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === eventId
          ? {
              ...e,
              start: newStart,
              end: new Date(
                newStart.getTime() + (e.end.getTime() - e.start.getTime())
              ),
            }
          : e
      ),
    })),
}));

// PUT THE autoSchedule FUNCTION HERE (after the store)
export const autoSchedule = (
  tasks: Task[],
  existingEvents: CalendarEvent[]
) => {
  const workingHours = { start: 9, end: 17 }; // 9 AM - 5 PM
  const sortedTasks = tasks
    .filter((t) => !t.scheduled_at && !t.completed)
    .sort((a, b) => {
      // Priority first, then deadline
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    });

  // Simplified scheduling logic - find next available slot
  const scheduledEvents: CalendarEvent[] = [];
  let currentTime = new Date();
  currentTime.setHours(workingHours.start, 0, 0, 0);

  sortedTasks.forEach((task) => {
    // Find next free slot (simplified - doesn't handle conflicts)
    const event: CalendarEvent = {
      id: crypto.randomUUID(),
      title: task.title,
      start: new Date(currentTime),
      end: new Date(currentTime.getTime() + task.duration * 60000),
      type: "task",
      task_id: task.id,
    };

    scheduledEvents.push(event);
    currentTime = new Date(event.end.getTime() + 15 * 60000); // 15 min buffer
  });

  return scheduledEvents;
};
