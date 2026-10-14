# Calendar

일정을 등록해서 관리할 수 있고, 중요한 일정을 놓치지 않도록 알림을 제공하는 react 캘린더 프로젝트입니다

## 주요기능

- 일정 등록 기능
    - 날짜와 시간을 입력하여 일정을 등록 할 수 있음.
- 푸시 알람 기능
    - 브라우저를 닫아도 등록된 시간에 알람을 표시해줌.

## 기술 스택

- React
- Vite
- TypeScript
- Shadcn ui
- Firebase

## 실행 방법

```bash
npm install
npm run dev
```

## Firebase AI 설정

1. Firebase Console에서 웹 앱을 등록하고 Firebase AI Logic을 활성화합니다.
2. 프로젝트 루트에서 `.env.example`을 `.env`로 복사하고 Firebase Console의 웹 앱 설정값을 입력합니다.

```bash
cp .env.example .env
```

`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`는 필수입니다.
3. Google AI Gemini Developer API를 Firebase AI Logic에서 활성화한 뒤 앱을 실행합니다.

```bash
npm run dev
```

Firebase 설정값은 웹 앱 식별용이며, Gemini API 키를 프런트엔드 환경변수에 넣지 마세요. AI 답변에는 `gemini-2.5-flash` 모델을 사용합니다.
