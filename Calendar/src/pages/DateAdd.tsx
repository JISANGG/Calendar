import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"


type DateAddProps = {
  initialDate: Date
  onCancel: () => void
  onAdd: (title: string, date: string, time: string) => void
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function DateAdd({ initialDate, onCancel, onAdd }: DateAddProps) {
  const [title, setTitle] = React.useState("")
  const [date, setDate] = React.useState(() => toDateInputValue(initialDate))
  const [time, setTime] = React.useState("09:00")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onAdd(title.trim(), date, time)
  }

  return (
    <form className="grid gap-6 h-80" onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>일정 추가</DialogTitle>
        <DialogDescription>
          날짜와 시간을 정해 새로운 일정을 등록하세요.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium">
          일정 이름
          <Input
            autoFocus
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="예: 팀원과 회의"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="grid gap-2 text-sm font-medium">
            날짜
            <Input
              required
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            시간
            <Input
              required
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </label>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit">일정 등록</Button>
      </DialogFooter>
    </form>
  )
}

export default DateAdd
