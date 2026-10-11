import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialog } from "@/components/ui/dialog"

type DateProps = {
  onCancel: () => void
  selectedDate?: Date
  events: {
    title: string
    content: string
    date: string
    time: string
    amountSpend: string
  }[]
}

export function DatePage({ selectedDate, events, onCancel }: DateProps) {
  return (
    <Card className="h-100 w-180 rounded-3xl py-10">
      <CardContent>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">당신의 일정</CardTitle>
          <CardDescription className="text-base">
            선택된 일정을 확인하세요
          </CardDescription>
          {selectedDate && (
            <CardAction className="mt-2 text-base font-semibold">
              <p>
                {selectedDate.toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </CardAction>
          )}
        </CardHeader>
        <div className="gap-3 px-3 py-6">
          {events.map((event, index) => (
            <CardContent
              key={`${event.date}-${event.time}-${index}`}
              className="h-full rounded-xl border p-4"
            >
              <CardAction>
                <Button type="button" variant="destructive" onClick={onCancel}>
                  취소
                </Button>
              </CardAction>
              <CardTitle className="font-semibold">{event.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {event.content}
              </CardDescription>
              <CardDescription className="text-sm">
                {event.date} {event.time} · 지출 {event.amountSpend}
              </CardDescription>
            </CardContent>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default DatePage
