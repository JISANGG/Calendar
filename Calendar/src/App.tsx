import * as React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Plus } from "lucide-react"
import DateAdd from "@/pages/DateAdd"
import Login from "@/pages/Login"

export function App() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [isDateAddOpen, setIsDateAddOpen] = React.useState(false)
  const [isLoginOpen, setIsLoginOpen] = React.useState(false)
  const [events, setEvents] = React.useState<
    { title: string; date: string; time: string }[]
  >([])

  function addEvent(title: string, eventDate: string, time: string) {
    setEvents((currentEvents) => [
      ...currentEvents,
      { title, date: eventDate, time },
    ])
    setIsDateAddOpen(false)
  }




  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <CalendarDays className="size-4" />
            </div>
            <div>
              <div className="font-semibold">Calendar</div>
              <div className="text-sm text-muted-foreground">
                당신의 일정을 관리해줍니다
              </div>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>일정 관리</SidebarGroupLabel>
            <SidebarGroupContent className="mt-3">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<a href="#calendar" />}
                    isActive
                    tooltip="내 일정"
                  >
                    <CalendarDays />
                    <span>내 일정</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="px-2 py-1 text-xs text-sidebar-foreground/60">
            소중한 일정을 관리하세요
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <h1 className="font-medium">내 일정</h1>
          <Button variant="ghost" className="ml-auto" onClick={() => setIsLoginOpen(true)}>
            로그인
          </Button>
          <Button size="sm" onClick={() => setIsDateAddOpen(true)}>
            <Plus />
            일정 추가하기
          </Button>
        </header>
        <div className="mt-10 ml-10 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight">나의 캘린더</h2>
          <p className="mt-1 text-muted-foreground">
            중요한 일정을 한곳에서 관리해 보세요.
          </p>
        </div>
        <main id="calendar" className="flex gap-8 p-6 md:p-10">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-95 rounded-lg border"
              captionLayout="dropdown"
            />
            {events.length > 0 && (
              <section className="mt-6 w-95" aria-label="등록된 일정">
                <h2 className="mb-3 font-medium">등록된 일정</h2>
                <ul className="grid gap-2">
                  {events.map((event, index) => (
                    <li
                      key={`${event.date}-${event.time}-${event.title}-${index}`}
                      className="flex rounded-lg border p-3 text-sm"
                    >
                      <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="mt-1 text-muted-foreground">
                        {event.date} · {event.time}
                      </p>
                      </div>
                      <div className="ml-auto">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setEvents((currentEvents) =>
                              currentEvents.filter((_, i) => i !== index)
                            )
                          }}
                        >
                          삭제
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </main>
      </SidebarInset>
      <Dialog open={isDateAddOpen} onOpenChange={setIsDateAddOpen}>
        <DialogContent>
          <DateAdd
            initialDate={date ?? new Date()}
            onCancel={() => setIsDateAddOpen(false)}
            onAdd={addEvent}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="max-w-md">
          <Login />
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}

export default App
