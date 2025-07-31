import CalendarView from "@/components/calendar-view"
import { Sidebar } from "@/components/sidebar"

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <CalendarView />
      </main>
    </div>
  )
}
