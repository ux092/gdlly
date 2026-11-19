# Guidely 📱✨

**Guidely** is a mobile-only, AI-first web app where users discover industry-leading courses and expert 1-on-1 services, with an intelligent AI Career Consultant on top.

Designed strictly for a **390x844** native mobile viewport with a phone container layout on desktop screens, safe area insets, bottom sheets, sticky CTAs, and a persistent 5-tab bottom navigation bar.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Visit the local URL shown in your terminal (typically `http://localhost:5173`).

---

## 🤖 Connecting n8n Webhooks (Optional)

Guidely includes an intelligent built-in mock knowledge engine that analyzes user goals, matches keywords across 12 courses, 10 services, and 6 experts, and returns structured recommendations with sources and follow-up prompts.

To connect live production AI agents and request pipelines, create a `.env` file in the project root:

```env
# AI Consultant Chat Webhook
VITE_N8N_WEBHOOK_URL="https://your-n8n-instance.com/webhook/guidely-consultant"

# Enrollment & Service Request Submission Webhook
VITE_N8N_REQUEST_WEBHOOK_URL="https://your-n8n-instance.com/webhook/guidely-request"
```

### Webhook Payloads & Response Contracts

#### 1. AI Consultant Webhook (`VITE_N8N_WEBHOOK_URL`)
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "message": "I want to master React 19 and get an architecture audit",
    "history": [...],
    "sessionId": "guidely-session-1",
    "timestamp": "2026-11-19T11:00:00Z"
  }
  ```
- **Expected JSON Response Shape**:
  ```json
  {
    "answer": "For modern web engineering, master React 19 Server Actions...",
    "sources": [
      { "title": "React 19 & Next.js Masterclass", "link": "/courses/c1" }
    ],
    "recommendations": [
      { "type": "course", "id": "c1" },
      { "type": "service", "id": "s1" }
    ],
    "followups": [
      "What are the prerequisites for the React masterclass?",
      "How does the 1-on-1 architecture audit work?"
    ]
  }
  ```

#### 2. Request Webhook (`VITE_N8N_REQUEST_WEBHOOK_URL`)
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "id": "req-1732014000000",
    "type": "service",
    "itemId": "s1",
    "title": "1-on-1 Codebase & Architecture Audit",
    "expertName": "Alex Chen",
    "packageName": "STANDARD Tier",
    "price": 290,
    "notes": "Looking for feedback on Server Actions and Lighthouse LCP.",
    "chatSummary": "Context attached from AI Consultant session...",
    "confirmationCode": "GD-982143"
  }
  ```

---

## 📱 Mobile Architecture & Features

- **Viewport**: 390x844 native mobile standard. Centered in a phone shell (`max-w-[430px]`) on desktop viewports.
- **AI Gradient**: The distinct indigo-to-violet gradient is reserved exclusively for AI elements (AI Consultant chat bubbles, AI Tutor button, and AI badges).
- **Persistent Bottom Tab Bar**: 5 tabs (`Home`, `Explore`, `AI`, `Learning`, `Profile`), automatically hidden on chat, player, onboarding, and forms.
- **Bottom Sheets**: Used for filters, sources, and the interactive in-lesson AI Tutor.
- **LocalStorage State**:
  - Saved learning plans (`/plan`)
  - Enrolled courses with lesson progress tracking (`/learning` and `/learn/:courseId`)
  - Active consulting and audit requests (`/requests`)
  - Profile and notification settings (`/profile`)
  - Multi-turn AI chat history (`/consultant`)
