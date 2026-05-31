# Full-Stack Intern Assessment - Event Landing Page

## 1. Live Gateways

* **Frontend (React / Vite):** https://cogent-solutions-nine.vercel.app/
* **Backend API (FastAPI):** https://ravindunirman-cogent-solutions-assessment.hf.space

---

## 2. Local Setup Guide

### Prerequisites

* Node.js (v18+)
* Python (3.9+)
* Google Gemini API key

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```
2. **Create a virtual environment**:
   ```bash
   python -m venv .venv
   ```
3. **Activate the virtual environment**:
   * Windows (PowerShell): `.\.venv\Scripts\activate`
   * Windows (Command Prompt): `.\.venv\Scripts\activate.bat`
   * Mac/Linux: `source .venv/bin/activate`
4. **Install backend dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
5. **Set up backend environment variables**:
   Create a `.env` file in the `backend/` directory:
   ```env
   GOOGLE_API_KEY=your_actual_gemini_api_key
   ```
6. **Start the FastAPI server**:
   ```bash
   uvicorn main:app --reload
   ```
   * The API will run locally on: `http://127.0.0.1:8000`
   * Swagger documentation is available at: `http://127.0.0.1:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```
2. **Install frontend dependencies**:
   ```bash
   npm install
   ```
3. **Set up frontend environment variables**:
   Copy the environment variables template file:
   ```bash
   cp .env.example .env
   ```
   * Set `VITE_API_BASE_URL` in `.env` to point to your backend:
     ```env
     VITE_API_BASE_URL=http://localhost:8000
     ```
4. **Start the React dev server**:
   ```bash
   npm run dev
   ```
   * Open your browser and navigate to: `http://localhost:5173` (or the port specified in terminal)

### Testing the Full Flow

1. Open the event registration form on the landing page.
2. Enter your Name, Email, and at least 20 characters of **Professional Priorities** (e.g., *"We want to optimize our fleet routes, decrease transport overheads, and improve visibility."*).
3. Click the **"Generate Personalized Invitation"** button.
4. Confirm that:
   * A recommended session matching your priorities is retrieved deterministically.
   * A personalized, professional 3-paragraph B2B invitation draft appears in the output preview.
   * The backend console logs an **`[MCP TRIGGER FIRED]`** block with the recipient email, a UTC timestamp, and the draft body.

---

## 3. Content Creation Check (LinkedIn Post)

Gulf supply chain leaders are navigating rising costs, volatility, and sustainability pressure—often without a clear roadmap. Our new Accelalpha–Oracle interactive event portal helps corporate conference planners deliver a smarter delegate experience: visitors share their priorities, receive a recommended session from the official agenda, and instantly get a personalized B2B invitation draft. If you run executive summits and want higher engagement with less manual follow-up, this is the kind of intelligent event experience your audience expects.

---

## 4. Architecture & Prompt Strategy

### Deterministic Session Routing & Fallbacks
To eliminate model hallucinations regarding event details, the routing engine operates deterministically prior to LLM interaction:
1. **Dynamic File Intake**: On startup, the backend parses `agenda.txt` into highly structured `AgendaSession` models containing metadata (Session ID, Time, Title, Speaker, Focus Keywords, and Description).
2. **Filtering Out Non-Content Blocks**: Sessions that do not provide core professional value (such as check-in/registrations `SESSION_1`, coffee break `SESSION_6`, and lunch `SESSION_10`) are strictly excluded from matching.
3. **Advanced Keyword & Phrase Scoring**: Attendee priorities undergo phrase-windowing and normalized keyword matching against session focus tags and descriptions.
4. **Resilient Fallback**: If the priority match score is low ($\le 1$), the engine falls back to `SESSION_8` (the executive panel debate: *"Strategies in Action: Insights from Industry Leaders"*), ensuring high-quality engagement for every delegate.

### Context-Insulated Prompt Strategy
Instead of allowing the LLM to search for a session, the backend matches it first. The LLM (`gemini-2.5-flash`) is then given a prompt containing **exclusively** the pre-selected matched session's parameters:
* **Strict Formatting Constraints**: The model is instructed to output exactly 3 paragraphs. It is explicitly forbidden from adding custom sign-offs (e.g., *"Sincerely"*, *"Team"*) beyond those paragraphs, and must start directly with *"Dear [Attendee Name],"*.
* **Paragraph Breakdown**:
  * *Paragraph 1*: Welcome to the summit with a targeted acknowledgement of their specific interests.
  * *Paragraph 2*: A contextual recommendation of the specific session, highlighting the speakers, time slot, and mapping the attendee's priorities directly to the session description to demonstrate business value.
  * *Paragraph 3*: A strictly defined closing line: *"We look forward to your participation."*
* **Output Sanitization**: The server uses `_clean_model_output` to strip markdown block syntax (like ` ```text ` or ` ``` `) and guarantee that the resulting draft displays perfectly inside the UI.

### MCP (Model Context Protocol) Integration
Once the invitation draft is successfully generated, the backend automatically invokes the `send_draft_via_mcp()` function. This triggers a simulated MCP dispatch that logs a clean envelope (`[MCP TRIGGER FIRED]`, recipient email, UTC ISO timestamp, and email body) to stdout, demonstrating a robust, server-side trigger system ready for production-level messaging integrations.

---
