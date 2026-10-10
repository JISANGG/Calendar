import { Button } from "@/components/ui/button"
import { Card, CardContent,CardTitle,CardDescription } from "@/components/ui/card"

export function App() {
  return (
        <Card className="w-[300px]">
          <CardContent>
            <CardTitle>일정 추가</CardTitle>
            <CardDescription>당신의 소중한 일정을 추가하세요</CardDescription>
            <Button className="mt-2">일정 등록하기</Button>
          </CardContent>
        </Card>
  )
}

export default App
