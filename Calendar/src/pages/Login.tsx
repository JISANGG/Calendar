import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function Login() {
  const [message, setMessage] = React.useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage("로그인 기능이 아직 서버에 연결되지 않았습니다.")
  }

  return (
    <Card className="w-100 border-0 bg-transparent py-0 shadow-none ring-0">
      <form
        onSubmit={handleSubmit}
        className="mr-auto ml-auto grid w-full max-w-sm gap-10"
      >
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-bold">로그인</CardTitle>
          <CardDescription>
            계정에 로그인해 캘린더를 관리하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 px-0">
          <div className="grid gap-2">
            <label htmlFor="login-email" className="text-sm font-medium">
              이메일
            </label>
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="이메일을 입력하세요."
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="login-password" className="text-sm font-medium">
              비밀번호
            </label>
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력하세요."
              required
            />
          </div>
          {message && (
            <p className="text-sm text-destructive" role="alert">
              {message}
            </p>
          )}
        </CardContent>
        <CardFooter className="border-0 bg-transparent p-0">
          <Button type="submit" className="w-full">
            로그인
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Login
