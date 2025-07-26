export interface Task {
  id: string;
  title: string;
  duration: number; // minutes
  priority: "low" | "medium" | "high";
  deadline?: Date;
  scheduled_at?: Date;
  completed: boolean;
  created_at: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: "task" | "meeting" | "block";
  task_id?: string;
}
