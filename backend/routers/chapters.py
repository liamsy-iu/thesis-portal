from fastapi import APIRouter
from database import execute_query, execute_update
from models import ThesisChapter
from typing import List

router = APIRouter(prefix="/chapters", tags=["Chapters"])

@router.get("", response_model=List[dict])
async def get_chapters():
    """Get all thesis chapters."""
    query = """
        SELECT * FROM thesis_chapters
        ORDER BY chapter_number
    """
    return execute_query(query)

@router.put("/{chapter_id}/progress")
async def update_chapter_progress(chapter_id: int, word_count: int, progress: int):
    """Update chapter word count and progress."""
    query = """
        UPDATE thesis_chapters
        SET word_count_current = %s,
            progress_percentage = %s,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
    """
    execute_update(query, (word_count, progress, chapter_id))
    return {"success": True}

@router.put("/{chapter_id}/status")
async def update_chapter_status(chapter_id: int, status: str):
    """Update chapter status."""
    query = """
        UPDATE thesis_chapters
        SET status = %s,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
    """
    execute_update(query, (status, chapter_id))
    return {"success": True}