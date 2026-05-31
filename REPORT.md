# ACCELALPHA-ORACLE-2024 Event Landing Page

## Local Setup

Backend:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Local URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API: http://localhost:8000/api/generate-invitation

## LinkedIn Post Draft

Excited to share a new event landing page experience for ACCELALPHA-ORACLE-2024, "Troubled Waters: Sailing with AI in Supply Chain." The application combines a polished React frontend with a FastAPI backend that matches attendee priorities to the most relevant session and generates a personalized invitation draft. Built for local-first development, it is ready to support executive event engagement with a clean routing and content-generation workflow.

## Anti-Hallucination Strategy

The backend avoids free-form guessing by grounding session selection in the exact agenda.txt file loaded at startup and by skipping non-content sessions such as registrations, breaks, and lunch. The Gemini prompt explicitly forbids invented speakers, titles, company names, or topics and only supplies one matched session at a time, which narrows the model's output space and keeps the generated email aligned to the provided source data.
