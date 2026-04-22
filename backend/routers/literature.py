from fastapi import APIRouter
from database import execute_query, execute_update
from models import Literature
from typing import List

router = APIRouter(prefix="/literature", tags=["Literature"])

@router.get("", response_model=List[dict])
async def get_literature(status: str = None):
    """Get all literature, optionally filtered by read status."""
    query = "SELECT * FROM literature"
    params = None
    
    if status:
        query += " WHERE read_status = %s"
        params = (status,)
    
    query += " ORDER BY year DESC, title"
    return execute_query(query, params)

@router.post("")
async def add_literature(lit: Literature):
    """Add new literature entry."""
    query = """
        INSERT INTO literature 
        (title, authors, year, source_type, publisher, url, read_status, 
         relevance_score, tags, abstract, key_findings)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    """
    result = execute_query(query, (
        lit.title, lit.authors, lit.year, lit.source_type, lit.publisher,
        lit.url, lit.read_status, lit.relevance_score, lit.tags,
        lit.abstract, lit.key_findings
    ))
    return {"id": result[0]['id']}

@router.put("/{lit_id}/status")
async def update_read_status(lit_id: int, status: str):
    """Update read status."""
    query = "UPDATE literature SET read_status = %s WHERE id = %s"
    execute_update(query, (status, lit_id))
    return {"success": True}

@router.get("/stats")
async def get_literature_stats():
    """Get literature statistics."""
    query = """
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN read_status = 'read' THEN 1 ELSE 0 END) as read,
            SUM(CASE WHEN read_status = 'reading' THEN 1 ELSE 0 END) as reading,
            SUM(CASE WHEN read_status = 'unread' THEN 1 ELSE 0 END) as unread
        FROM literature
    """
    result = execute_query(query)
    return result[0] if result else {}