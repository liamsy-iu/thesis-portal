from pydantic import BaseModel
from typing import Optional, List
from datetime import date

class MPESAMetric(BaseModel):
    year: int
    month: Optional[int] = None
    active_users_monthly: Optional[int] = None
    transaction_volume: Optional[int] = None
    transaction_value_kes: Optional[float] = None
    agent_count: Optional[int] = None

class ThesisChapter(BaseModel):
    id: Optional[int] = None
    chapter_number: int
    title: str
    word_count_target: Optional[int] = None
    word_count_current: int = 0
    status: str = "planning"
    progress_percentage: int = 0
    outline: Optional[str] = None
    notes: Optional[str] = None
    due_date: Optional[date] = None

class Literature(BaseModel):
    id: Optional[int] = None
    title: str
    authors: Optional[str] = None
    year: Optional[int] = None
    source_type: str
    publisher: Optional[str] = None
    url: Optional[str] = None
    read_status: str = "unread"
    relevance_score: Optional[int] = None
    tags: Optional[List[str]] = None
    abstract: Optional[str] = None
    key_findings: Optional[str] = None

class ResearchNote(BaseModel):
    id: Optional[int] = None
    literature_id: Optional[int] = None
    note_type: str
    content: str
    page_number: Optional[str] = None
    chapter_relation: Optional[str] = None
    tags: Optional[List[str]] = None