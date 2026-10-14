import { getAI, getGenerativeModel, GoogleAIBackend } from "@firebase/ai"
import { initializeApp } from "@firebase/app"
import { firebaseConfig, isFirebaseAIConfigured } from "@/lib/firebase-config"

const generativeModel = isFirebaseAIConfigured
  ? getGenerativeModel(
      getAI(initializeApp(firebaseConfig), {
        backend: new GoogleAIBackend(),
      }),
      {
        model: "gemini-2.5-flash",
        systemInstruction:
          "당신은 사용자의 일정 관리를 돕는 한국어 AI 비서입니다. 명확하고 실용적으로 답하고, 일정 정보가 부족하면 필요한 내용을 질문하세요.",
      },
    )
  : null

export type AIChatMessage = {
  role: "user" | "assistant"
  content: string
}

export async function generateAIResponse(
  messages: AIChatMessage[],
): Promise<string> {
  if (!generativeModel) {
    throw new Error(
      "Firebase AI가 설정되지 않았습니다. .env에 Firebase 웹 앱 설정을 입력하세요.",
    )
  }

  const history = messages.map((message) => ({
    role: (message.role === "assistant" ? "model" : "user") as
      | "model"
      | "user",
    parts: [{ type: "text" as const, text: message.content }],
  }))
  const result = await generativeModel.generateContent({ contents: history })
  const response = result.response.text().trim()

  if (!response) {
    throw new Error("AI가 빈 답변을 반환했습니다. 다시 시도해 주세요.")
  }

  return response
}