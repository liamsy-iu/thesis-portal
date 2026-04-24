"""Data analysis endpoints."""
from fastapi import APIRouter
from database import execute_query

router = APIRouter(prefix="/data", tags=["data"])

@router.get("/mpesa/yearly")
async def get_yearly_data():
    """Get M-PESA data aggregated by year."""
    query = """
        SELECT year, active_users, transactions, value_kes, agents
        FROM mpesa_data
        ORDER BY year
    """
    return execute_query(query)

@router.get("/mpesa/growth")
async def get_growth_rates():
    """Calculate year-over-year growth rates."""
    query = """
        WITH yearly AS (
            SELECT 
                year,
                active_users,
                transactions,
                LAG(active_users) OVER (ORDER BY year) as prev_users,
                LAG(transactions) OVER (ORDER BY year) as prev_txns
            FROM mpesa_data
            ORDER BY year
        )
        SELECT 
            year,
            active_users as users,
            transactions as txns,
            CASE 
                WHEN prev_users > 0 THEN ROUND(((active_users - prev_users)::numeric / prev_users * 100), 1)
                ELSE NULL
            END as user_growth_pct,
            CASE 
                WHEN prev_txns > 0 THEN ROUND(((transactions - prev_txns)::numeric / prev_txns * 100), 1)
                ELSE NULL
            END as txn_growth_pct
        FROM yearly
    """
    return execute_query(query)

@router.get("/stats/summary")
async def get_summary_stats():
    """Get overall summary statistics."""
    query = """
        SELECT 
            COUNT(DISTINCT year) as years_covered,
            MAX(active_users) as max_users,
            SUM(transactions) as total_transactions,
            (SELECT COUNT(*) FROM research_notes) as notes_count
        FROM mpesa_data
    """
    result = execute_query(query)
    return result[0] if result else {}