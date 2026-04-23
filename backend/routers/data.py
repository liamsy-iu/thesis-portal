from fastapi import APIRouter
from database import execute_query
from typing import List

router = APIRouter(prefix="/data", tags=["Data"])

@router.get("/mpesa/yearly")
async def get_mpesa_yearly():
    """Get M-PESA metrics aggregated by year."""
    query = """
        SELECT 
            year,
            MAX(active_users_monthly) as active_users,
            SUM(transaction_volume) as transactions,
            SUM(transaction_value_kes) as value_kes,
            MAX(agent_count) as agents
        FROM mpesa_data
        GROUP BY year
        ORDER BY year
    """
    results = execute_query(query)
    return results

@router.get("/mpesa/growth")
async def get_mpesa_growth():
    """Calculate year-over-year growth rates."""
    query = """
        WITH yearly AS (
            SELECT 
                year,
                MAX(active_users_monthly) as users,
                SUM(transaction_volume) as txns
            FROM mpesa_data
            GROUP BY year
        )
        SELECT 
            year,
            users,
            txns,
            ROUND(((users::numeric - LAG(users) OVER (ORDER BY year)) / 
                   NULLIF(LAG(users) OVER (ORDER BY year), 0) * 100), 2) as user_growth_pct,
            ROUND(((txns::numeric - LAG(txns) OVER (ORDER BY year)) / 
                   NULLIF(LAG(txns) OVER (ORDER BY year), 0) * 100), 2) as txn_growth_pct
        FROM yearly
        ORDER BY year
    """
    results = execute_query(query)
    return results

@router.get("/financial-inclusion")
async def get_financial_inclusion():
    """Get financial inclusion metrics."""
    query = """
        SELECT * FROM financial_inclusion_metrics
        ORDER BY year DESC, region
    """
    results = execute_query(query)
    return results

@router.get("/stats/summary")
async def get_summary_stats():
    """Get overall summary statistics."""
    query = """
        SELECT 
            COUNT(DISTINCT year) as years_covered,
            MIN(year) as first_year,
            MAX(year) as latest_year,
            (SELECT COUNT(*) FROM literature) as literature_count,
            (SELECT COUNT(*) FROM research_notes) as notes_count
        FROM mpesa_data
    """
    result = execute_query(query)
    return result[0] if result else {}