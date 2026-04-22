"""Database connection and helper functions."""
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import os

load_dotenv()

def get_connection():
    """Get a PostgreSQL database connection."""
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432"),
        database=os.getenv("DB_NAME", "thesis_research"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", ""),
    )

def execute_query(query, params=None, fetch=False):
    """Execute a SQL query with optional parameters."""
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params)
            if fetch:
                return cur.fetchall()
            conn.commit()
            return cur.rowcount
    finally:
        conn.close()

def insert_data_source(name, source_type, url=None, file_path=None, notes=None):
    """Insert a data source record and return its ID."""
    query = """
        INSERT INTO data_sources (source_name, source_type, url, file_path, notes)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id
    """
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(query, (name, source_type, url, file_path, notes))
            source_id = cur.fetchone()[0]
            conn.commit()
            return source_id
    finally:
        conn.close()