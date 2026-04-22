"""Database connection pool."""
import psycopg2
from psycopg2.extras import RealDictCursor
from psycopg2.pool import SimpleConnectionPool
from dotenv import load_dotenv
import os

load_dotenv()

pool = SimpleConnectionPool(
    1, 10,
    host=os.getenv("DB_HOST", "localhost"),
    port=os.getenv("DB_PORT", "5432"),
    database=os.getenv("DB_NAME", "thesis_research"),
    user=os.getenv("DB_USER", "postgres"),
    password=os.getenv("DB_PASSWORD", ""),
)

def get_db():
    """Get a database connection from the pool."""
    conn = pool.getconn()
    try:
        yield conn
    finally:
        pool.putconn(conn)

def execute_query(query, params=None):
    """Execute a query and return results."""
    conn = pool.getconn()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params)
            return cur.fetchall()
    finally:
        pool.putconn(conn)

def execute_update(query, params=None):
    """Execute an INSERT/UPDATE/DELETE query."""
    conn = pool.getconn()
    try:
        with conn.cursor() as cur:
            cur.execute(query, params)
            conn.commit()
            return cur.rowcount
    finally:
        pool.putconn(conn)