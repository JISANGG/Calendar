import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import DatePage from "@/pages/DatePage"
import DateAdd from "@/pages/DateAdd"

type CalendarEvent = {
  title: string
  content: string
  date: string
  time: string
  amountSpend: string
  location?: string
}

type CalendarPageProps = {
  isDateAddOpen: boolean
  onDateAddOpenChange: (open: boolean) => void
}

export function CalendarPage({
  isDateAddOpen,
  onDateAddOpenChange,
}: CalendarPageProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [events, setEvents] = React.useState<CalendarEvent[]>([])

  function addEvent(
    title: string,
    content: string,
    eventDate: string,
    time: string,
    amountSpend: string,
    location?: string,
  ) {
    setEvents((currentEvents) => [
      ...currentEvents,
      { title, content, date: eventDate, time, amountSpend, location },
    ])
    onDateAddOpenChange(false)
  }

  return (
    <>
      <main
        id="calendar"
        className="flex min-w-0 flex-col gap-6 px-4 py-2 sm:px-6"
      >
        <div className="h-140 min-w-0 [container-type:size]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="h-full w-full min-w-0 rounded-3xl border px-4 py-4 [--cell-size:min(calc((100cqw-40px)/7),calc((100cqh-50px)/8))]"
            captionLayout="dropdown"
          />
        </div>
        <div className="min-w-0">
          <DatePage selectedDate={date} events={events} onCancel={() => {}} />
        </div>
      </main>
      <Dialog open={isDateAddOpen} onOpenChange={onDateAddOpenChange}>
        <DialogContent>
          <DateAdd
            initialDate={date ?? new Date()}
            onCancel={() => onDateAddOpenChange(false)}
            onAdd={addEvent}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CalendarPage
