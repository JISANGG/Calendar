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
import { CalendarDays, Plus, ClipboardList, LoaderCircle } from "lucide-react"

import CalendarPage from "@/pages/CalendarPage"
import Login from "@/pages/Login"
import { isFirebaseAIConfigured } from "@/lib/firebase-config"
import type { AIChatMessage } from "@/lib/firebase-ai"

export function App() {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false)
  const [isDateAddOpen, setIsDateAddOpen] = React.useState(false)

  const [question, setQuestion] = React.useState('')
  const [messages, setMessages] = React.useState<AIChatMessage[]>([])
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [aiError, setAIError] = React.useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const submittedQuestion = question.trim()
    if (!submittedQuestion || isGenerating) return

    const nextMessages = [
      ...messages,
      { role: "user" as const, content: submittedQuestion },
    ]
    setMessages(nextMessages)
    setQuestion('')
    setAIError("")
    setIsGenerating(true)

    try {
      const { generateAIResponse } = await import("@/lib/firebase-ai")
      const response = await generateAIResponse(nextMessages)
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: response },
      ])
    } catch (error) {
      setAIError(
        error instanceof Error
          ? error.message
          : "AI 답변을 생성하지 못했습니다. 다시 시도해 주세요.",
      )
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <SidebarProvider>
      <Sidebar side="left" id="main-sidebar">
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
              <SidebarMenu className="gap-2">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="rounded-md py-5"
                    render={<a href="#calendar" />}
                    isActive
                    tooltip="내 일정"
                  >
                    <CalendarDays />
                    <span>내 일정</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="rounded-md py-5"
                    tooltip="AI와 대화하기"
                  >
                    <ClipboardList />
                    <span>오늘의 할 일</span>
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
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 flex h-14 min-w-0 items-center gap-2 border-b bg-white px-3 sm:gap-3 sm:px-4">
          <SidebarTrigger className="shrink-0" />
          <h1 className="min-w-0 flex-1 truncate font-medium">내 일정</h1>
          <Button
            variant="ghost"
            className="shrink-0 px-2 sm:px-3"
            onClick={() => setIsLoginOpen(true)}
          >
            로그인
          </Button>
          <Button
            className="shrink-0 px-2 pt-1.5 pb-1.5 sm:px-3"
            size="sm"
            onClick={() => setIsDateAddOpen(true)}
            aria-label="일정 추가하기"
          >
            <Plus />
            <span className="hidden xl:inline">일정 추가하기</span>
          </Button>
        </header>
        <div className="mt-5 ml-10 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight">나의 캘린더</h2>
          <p className="mt-1 text-muted-foreground">
            중요한 일정을 한곳에서 관리해 보세요.
          </p>
        </div>
        <CalendarPage
          isDateAddOpen={isDateAddOpen}
          onDateAddOpenChange={setIsDateAddOpen}
        />
      </SidebarInset>
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="max-w-md">
          <Login />
        </DialogContent>
      </Dialog>
      <SidebarProvider className="min-h-0 w-auto flex-none">
        <Sidebar id="ai-sidebar" side="right">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1.5">
              <div className="text-sl font-semibold">AI 일정 도우미</div>
              <SidebarTrigger className="ml-auto" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <div
              aria-live="polite"
              className="min-w-0 flex-1 overflow-y-auto p-2"
              role="log"
            >
              <ul className="space-y-3">
                {messages.map((message, index) => (
                  <li
                    className={`max-w-[90%] wrap-break-word rounded-lg px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                    key={`${index}-${message.role}`}
                  >
                    {message.content}
                  </li>
                ))}
              </ul>
              {isGenerating && (
                <p className="mt-3 flex items-center gap-2 px-3 text-sm text-muted-foreground">
                  <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                  답변을 생성하고 있습니다...
                </p>
              )}
              {aiError && (
                <p className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {aiError}
                </p>
              )}
            </div>
            <form className="mt-auto px-2 py-1.5" onSubmit={handleSubmit}>
              <div className="flex items-center gap-2">
                <input
                  aria-label="AI에게 일정 질문"
                  className="h-11 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm"
                  placeholder="AI에게 일정을 질문하세요..."
                  type="text"
                  required
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  disabled={!question.trim() || isGenerating}
                >
                  {isGenerating ? "생성 중" : "전송"}
                </Button>
              </div>
            </form>
          </SidebarContent>
          <SidebarFooter>
            <p className="px-2 py-1 text-xs text-sidebar-foreground/60">
              {isFirebaseAIConfigured
                ? "Gemini AI 일정 도우미"
                : "Firebase 설정 후 AI를 사용할 수 있습니다."}
            </p>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </SidebarProvider>
  )
}

export default App
