"use client";
import { useState } from "react";
import { useCalendar, autoSchedule } from "@/stores/calendar";

export function TaskSidebar() {
  const { tasks, events, addTask } = useCalendar();
  const [newTask, setNewTask] = useState({
    title: "",
    duration: 60,
    priority: "medium" as const,
  });

  const unscheduledTasks = tasks.filter(
    (t) => !t.completed && !events.some((e) => e.task_id === t.id)
  );

  const handleAutoSchedule = () => {
    const scheduledEvents = autoSchedule(unscheduledTasks, events);
    // Add events to store (you'd implement this)
  };

  return (
    <div className="w-80 bg-gray-50 border-r p-4 space-y-4">
      {/* Quick Add */}
      <div className="space-y-2">
        <input
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full p-2 rounded border"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Duration (min)"
            value={newTask.duration}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, duration: +e.target.value }))
            }
            className="flex-1 p-2 rounded border"
          />
          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask((prev) => ({
                ...prev,
                priority: e.target.value as any,
              }))
            }
            className="p-2 rounded border"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
          onClick={() => {
            if (newTask.title) {
              addTask(newTask);
              setNewTask({ title: "", duration: 60, priority: "medium" });
            }
          }}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      {/* Auto Schedule */}
      <button
        onClick={handleAutoSchedule}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Auto Schedule ({unscheduledTasks.length})
      </button>

      {/* Task List */}
      <div className="space-y-2">
        <h3 className="font-medium">Unscheduled Tasks</h3>
        {unscheduledTasks.map((task) => (
          <div key={task.id} className="p-2 bg-white rounded border text-sm">
            <div className="font-medium">{task.title}</div>
            <div className="text-gray-600">
              {task.duration}min • {task.priority}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
