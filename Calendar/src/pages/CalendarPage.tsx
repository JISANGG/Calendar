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
  ) {
    setEvents((currentEvents) => [
      ...currentEvents,
      { title, content, date: eventDate, time, amountSpend },
    ])
    onDateAddOpenChange(false)
  }

  return (
    <>
      <main
        id="calendar"
        className="grid min-w-0 grid-cols-1 gap-8 p-6 md:p-10 2xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      >
        <div className="min-w-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full max-w-200 rounded-3xl border px-6 py-7"
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
