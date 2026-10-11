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
      <main id="calendar" className=" flex gap-8 p-6 md:p-10">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-200 rounded-3xl border py-7 px-6"
            captionLayout="dropdown"
          />
        </div>
        <div>
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
