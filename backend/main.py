from __future__ import annotations

import os
import re
from dataclasses import dataclass, asdict
from datetime import datetime
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai


BASE_DIR = Path(__file__).resolve().parent
AGENDA_PATH = BASE_DIR / "agenda.txt"


class InvitationRequest(BaseModel):
    name: str
    email: str
    priorities: str


class MatchedSession(BaseModel):
    session_id: str
    title: str
    time: str
    speaker: str


class InvitationResponse(BaseModel):
    matched_session: MatchedSession
    invitation_draft: str


@dataclass(frozen=True)
class AgendaSession:
    session_id: str
    time: str
    title: str
    speaker: str
    focus_keywords: str
    description: str


app = FastAPI(title="ACCELALPHA-ORACLE-2024 Invitation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


AGENDA_SESSIONS: list[AgendaSession] = []


def _parse_agenda_file(raw_text: str) -> list[AgendaSession]:
    sessions: list[AgendaSession] = []
    blocks = re.split(r"(?=\[SESSION_\d+\])", raw_text)

    for block in blocks:
        session_match = re.search(r"\[SESSION_(\d+)\]", block)
        time_match = re.search(r"Time:\s*(.+)", block)
        title_match = re.search(r"Title:\s*(.+)", block)
        speaker_match = re.search(r"Speaker:\s*(.+)", block)
        focus_match = re.search(r"Focus Keywords:\s*(.+)", block)
        description_match = re.search(r"Description:\s*(.+)", block)

        if not (session_match and time_match and title_match and speaker_match and focus_match and description_match):
            continue

        sessions.append(
            AgendaSession(
                session_id=f"SESSION_{session_match.group(1)}",
                time=time_match.group(1).strip(),
                title=title_match.group(1).strip(),
                speaker=speaker_match.group(1).strip(),
                focus_keywords=focus_match.group(1).strip(),
                description=description_match.group(1).strip(),
            )
        )

    return sessions


def _load_agenda_sessions() -> list[AgendaSession]:
    if not AGENDA_PATH.exists():
        raise RuntimeError(f"agenda.txt not found at {AGENDA_PATH}")

    raw_text = AGENDA_PATH.read_text(encoding="utf-8")
    sessions = _parse_agenda_file(raw_text)

    if not sessions:
        raise RuntimeError("No sessions could be parsed from agenda.txt")

    return sessions


def _normalize_words(text: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", text.lower())


def _normalize_text(text: str) -> str:
    return " ".join(_normalize_words(text))


def _build_phrase_windows(words: list[str]) -> list[str]:
    phrases: list[str] = []
    for size in (2, 3):
        for index in range(len(words) - size + 1):
            phrases.append(" ".join(words[index : index + size]))
    return phrases


def _score_session(priorities: str, session: AgendaSession) -> int:
    user_words = _normalize_words(priorities)
    if not user_words:
        return 0

    session_text = _normalize_text(f"{session.focus_keywords} {session.description}")
    session_word_set = set(session_text.split())

    score = sum(1 for word in set(user_words) if word in session_word_set)

    for phrase in _build_phrase_windows(user_words):
        if phrase in session_text:
            score += len(phrase.split())

    return score


def _select_matched_session(priorities: str) -> AgendaSession:
    eligible_sessions = [
        session
        for session in AGENDA_SESSIONS
        if session.session_id not in {"SESSION_1", "SESSION_6", "SESSION_10"}
    ]

    if not eligible_sessions:
        raise RuntimeError("No eligible agenda sessions available")

    best_session = max(eligible_sessions, key=lambda session: _score_session(priorities, session))
    best_score = _score_session(priorities, best_session)

    default_session = next(
        (session for session in eligible_sessions if session.session_id == "SESSION_8"),
        best_session,
    )

    if best_score <= 1:
        return default_session

    return best_session


def _clean_model_output(text: str, name: str) -> str:
    cleaned = text.strip()
    cleaned = re.sub(r"^```(?:text)?\s*", "", cleaned)
    cleaned = re.sub(r"\s*```$", "", cleaned)
    if not cleaned.lower().startswith("dear"):
        cleaned = f"Dear {name},\n\n{cleaned}"
    return cleaned


def send_draft_via_mcp(email_address: str, email_body: str):
    timestamp = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
    print("=" * 60)
    print(f"[MCP TRIGGER FIRED]")
    print(f"Recipient : {email_address}")
    print(f"UTC Time  : {timestamp}")
    print(f"Body      :\n{email_body}")
    print("=" * 60)


@app.on_event("startup")
def load_agenda_on_startup() -> None:
    global AGENDA_SESSIONS
    load_dotenv(BASE_DIR / ".env")
    AGENDA_SESSIONS = _load_agenda_sessions()


@app.post("/api/generate-invitation", response_model=InvitationResponse)
def generate_invitation(payload: InvitationRequest) -> dict[str, Any]:
    if not AGENDA_SESSIONS:
        raise HTTPException(status_code=500, detail="Agenda data is not available.")

    matched_session = _select_matched_session(payload.priorities)

    prompt = f"""
Write a personalized welcome and invitation email to "{payload.name}" in exactly 3 paragraphs.

1. Welcome to the ACCELALPHA-ORACLE-2024 summit! We're pleased to highlight a session tailored to your interests in "{payload.priorities}".
2. Recommend attending "{matched_session.title}" at {matched_session.time}. Presenters: {matched_session.speaker}. Explain how the session covers their priorities based on this description: "{matched_session.description}". Mention it is an excellent opportunity to gain practical insights on supply chain resilience from industry executives directly relevant to their professional focus.
3. Conclude with exactly: "We look forward to your participation."

Do not add any sign-offs (such as 'Sincerely' or 'Team') beyond these 3 paragraphs. Start directly with "Dear {payload.name},"
""".strip()

    try:
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise RuntimeError("GOOGLE_API_KEY is missing from the environment.")

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        invitation_draft = _clean_model_output(getattr(response, "text", ""), payload.name)
    except Exception as exc:  # pragma: no cover - surfaced to client as a 500
        raise HTTPException(status_code=500, detail=f"Gemini generation failed: {exc}") from exc

    send_draft_via_mcp(payload.email, invitation_draft)

    return {
        "matched_session": asdict(matched_session),
        "invitation_draft": invitation_draft,
    }
