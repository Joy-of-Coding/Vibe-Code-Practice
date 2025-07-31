import { Card } from "@/components/ui/card"

interface Event {
  id: string
  title: string
  description: string
  date: Date
  startTime: string
  endTime: string
  color: string
}

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300",
    green:
      "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300",
    red: "bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300",
    yellow:
      "bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-300",
    purple:
      "bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-300",
  }

  const colorClass = colorMap[event.color] || colorMap.blue

  return (
    <Card className={`p-3 border-l-4 ${colorClass}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{event.title}</h3>
          <p className="text-sm text-muted-foreground">{event.description}</p>
        </div>
        <div className="text-sm font-medium">
          {event.startTime} - {event.endTime}
        </div>
      </div>
    </Card>
  )
}
